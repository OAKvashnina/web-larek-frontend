import { Component } from "../base/Components";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface IBasket {
    cards: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasket> {
    protected list: HTMLUListElement;
    protected price: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this.list = ensureElement<HTMLUListElement>('.basket__list', container);
        this.price = ensureElement('.basket__price', container);
        this.button = container.querySelector('.basket__button');

        this.button.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set cards(items: HTMLElement[]) {
        this.list.replaceChildren(...items);
    }

    set total(value: number) {
        this.setText(this.price, value + ' синапсов');
        this.setDisabled(this.button, value === 0);
    }
}