import './scss/styles.scss';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi } from './types';
import { API_URL, settings } from './utils/constants';
import { CardData, CatalogChangeEvent } from './components/CardsData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, CatalogCard } from './components/Card';
import { Page } from './components/Page';


const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

// Чтобы мониторить все события, для отладки
events.onAll((event) => {
    console.log(event.eventName, event.data)
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const cardsData = new CardData(events);
const page = new Page(document.body, events);


// Получаем карточки с сервера
Promise.all([api.getCards()])
	.then(([initialCards]) => {
        console.log(initialCards)
		cardsData.cards = initialCards;
        console.log(initialCards)
        events.emit('initialData:loader');
	})
	.catch((err) => {
		console.error(err);
	});

// Чтобы мониторить все события, для отладки
/*events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})*/

/*events.on('initialData:loader', () => {
    console.log(cardsData.cards);
    const cardsArray = cardsData.cards.map(item => {
        console.log(item);
        const cardInstante = new Card(cloneTemplate(cardCatalogTemplate), {onClick: () => events.emit('card:select', item)});
        console.log(item);
        //return cardInstante.render(item);
    })

});*/
events.on('initialData:loader', () => {
    console.log(cardsData.cards);
    page.cards = cardsData.cards.map((item)=> {
        console.log(item);
      const card = new CatalogCard(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item)
      });
      return card.render({
        id: item.id,
        title: item.title,
        image: item.image,
       // category: item.category,
       // price: item.price,
      });
    });
  });