import './scss/styles.scss';
import { AppApi } from './components/model/AppApi';
import { EventEmitter } from './components/base/events';
import { ICard, TCardCatalog, IOrderForm, TFormErrors, IOrder } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { CardData/*, CatalogChangeEvent */ } from './components/model/CardsData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardBasket, CardCatalog, CardPreview } from './components/view/Card';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { BasketData } from './components/model/BasketData';
import { Basket } from './components/view/Basket';
import { OrderForm, ContactsForm } from './components/view/Order';
import { OrderData } from './components/model/OrderData';
import { Success } from './components/view/Success';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

events.onAll((event) => {
  console.log(event.eventName, event.data)
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBaskeTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const baskeTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalElement = ensureElement<HTMLElement>('#modal-container');

const cardsData = new CardData({}, events);
const basketData = new BasketData({}, events);
const orderData = new OrderData({}, events);

const page = new Page(ensureElement('.page'), events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(baskeTemplate), events);
const order = new OrderForm(cloneTemplate(orderTemplate), events);
const contacts = new ContactsForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
  onClick: () => { modal.close(); }
});

api.getCards()
  .then(data => {
    cardsData.setCards(data);
  })
  .catch(err => {
    console.error(err);
  });

events.on('cards:changed', () => {
  page.cards = cardsData.getCards().map((item) => {
    const card = new CardCatalog<TCardCatalog>(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price
    });
  });
});

events.on('card:select', (item: ICard) => {
  const cardInBasket = basketData.include(item.id);
  const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      cardInBasket ? events.emit('card:deleteBasket', item) : events.emit('card:addBasket', item);
      modal.close();
    }
  });
  modal.render({
    content: card.render({
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
      description: item.description,
      inBasket: cardInBasket
    })
  });
});

events.on('card:addBasket', (item: ICard) => {
  basketData.addCard(item);
});

events.on('card:deleteBasket', (item: ICard) => {
  basketData.delCard(item.id);
});

events.on('basket:changed', () => {
  const cardsBasket = basketData.getCards().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBaskeTemplate), {
      onClick: () => events.emit('card:deleteBasket', item)
    });
    return card.render({
      sequence: ++index,
      title: item.title,
      price: item.price
    });
  });

  basket.render({
    cards: cardsBasket,
    total: basketData.getTotalPrice()
  });

  page.counter = basketData.count();
});

events.on('basket:open', () => {
  modal.render({
    content: basket.render()
  });
});

events.on('order:open', () => {
  orderData.reset();
  const value = orderData.getOrder();
  modal.render({
    content: orderRender(value.payment, value.address, false, '')
  });
});

events.on('order:change', (data: { field: keyof IOrderForm, value: string }) => {
  orderData.setField(data.field, data.value);
})

events.on('orderData:change', (errors: Partial<IOrderForm>) => {
  const value = orderData.getOrder();
  const { payment, address, phone, email } = errors;
  const errorTextOrder = getErrorText({ payment, address });
  const errorTextContact = getErrorText({ email, phone });
  orderRender(value.payment, value.address, !errorTextOrder, errorTextOrder);
  contactsRender(value.phone, value.email, !errorTextContact, errorTextContact);
});

function orderRender(payment: string, address: string, valid: boolean, errorText: string): HTMLElement {
  return order.render({
    payment: payment,
    address: address,
    valid: valid,
    error: errorText
  });
}

events.on('order:submit', () => {
  const value = orderData.getOrder();
  modal.render({
    content: contactsRender(value.phone, value.email, false, '')
  });
});

function contactsRender(phone: string, email: string, valid: boolean, errorText: string): HTMLElement {
  return contacts.render({
    phone: phone,
    email: email,
    valid: valid,
    error: errorText
  });
}

function getErrorText(errors: TFormErrors): string {
  return Object.values(errors).filter(item => !!item).join('; ');
}

events.on('contacts:submit', () => {
  const dataOrder: IOrder = {
    ...orderData.getOrder(),
    items: basketData.getCardsList(),
    total: basketData.getTotalPrice()
  };
  api.postOrder(dataOrder)
    .then(data => {
      modal.render({
        content: success.render({
          total: data.total
        })
      });
      basketData.delCards();
    })
    .catch(err => {
      console.error(err);
    });
});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});  