import { TCardPreview, TCardBasket} from '../../types';
import { Component } from "../base/Components";
import { ensureElement } from "../../utils/utils";
import { categoryColor } from "../../utils/constants";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<T> {
    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardButton: HTMLButtonElement;
    
    constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);
		this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
		this.cardPrice = ensureElement<HTMLElement>('.card__price', container);
		this.cardButton = container.querySelector('.card__button');
		if (actions?.onClick) {
            if (this.cardButton) {
                this.cardButton.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }	
	}

	set title(value: string) {
		this.setText(this.cardTitle, value);
	}

	set price(value: number) {
		this.setText(this.cardPrice, value ? `${value} синапсов` : 'Бесценно');
	}
}

export class CardCatalog<T> extends Card<T> {
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLImageElement;
	
	constructor(container: HTMLElement, actions: ICardActions) {
		super(container, actions);
	  	this.cardCategory = container.querySelector('.card__category');
	 	this.cardImage = container.querySelector('.card__image'); 
	}

	set category(value: keyof typeof categoryColor) {
		this.setText(this.cardCategory, value);
		const backgroundColor = categoryColor[value];
		if (backgroundColor) {
			this.toggleClass(this.cardCategory, `card__category_${backgroundColor}`);
		}
	}
	
	set image(value: string) {
		this.setImage(this.cardImage, value);
  	}	
  }

  interface IInBasket {
	inBasket: boolean;
  }

  export class CardPreview extends CardCatalog<TCardPreview & IInBasket> {
	protected cardText: HTMLParagraphElement;

	constructor(container:HTMLElement, actions: ICardActions) {
		super(container, actions);
		this.cardText = container.querySelector('.card__text');
	}
	
	set description(value: string) {
		this.setText(this.cardText, value);
	}

	set inBasket (value: boolean) {
		if (value) {
			this.setText(this.cardButton, 'Удалить из корзины');	
		}	
	}
}

export class CardBasket extends Card<TCardBasket> {
	protected itemIndex: HTMLElement;
	constructor(container: HTMLElement, actions: ICardActions) {
		super(container, actions);
		this.itemIndex = container.querySelector('.basket__item-index');
	}

	set sequence(value: number) {
		this.setText(this.itemIndex, value);
	}
}