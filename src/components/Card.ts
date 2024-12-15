import { ICard } from '../types';
import { Component } from "./base/Components";
import { IEvents } from './base/events';
import {ensureElement} from "../utils/utils";
import { CDN_URL } from "../utils/constants";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
  
   
   // protected cardCategory: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardTitle: HTMLElement;
    //protected cardText: HTMLElement;
    //protected cardPrice: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected cardId: string;
    
    constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);

		this.cardImage = this.container.querySelector('.card__image');
		this.cardTitle = this.container.querySelector('.card__title');

		/*this.cardImage.addEventListener('click', () =>
			this.events.emit('card:select', { card: this })
		);*/
		if (actions?.onClick) {
            if (this.cardButton) {
                this.cardButton.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }

		
	}

	// Сеттер и геттер для уникального ID
	set id(value: string) {
		this.container.dataset.id = value;
	  }
	  get id(): string {
		return this.container.dataset.id || '';
	  }
	

	// Сеттер и гетер для названия
	set title(value: string) {
		this.cardTitle.textContent = value;
	}
	get title(): string {
		return this.cardTitle.textContent || '';
	}

	  // Сеттер для кратинки
  	set image(value: string) {
    	this.cardImage.src = CDN_URL + value;
  	}
}

export class CatalogCard extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
	  super(container);
	}
  }