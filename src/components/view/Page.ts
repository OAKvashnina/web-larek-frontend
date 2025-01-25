import { Component } from "../base/Components";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface IPage {
    counter: number;
    cards: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected catalog: HTMLElement;
    protected wrapper: HTMLElement;
    protected basket: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.catalog = ensureElement<HTMLElement>('.gallery');
        this.wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this.basket = ensureElement<HTMLElement>('.header__basket');
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');

        this.basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(counter: number) {
        this.setText(this._counter, String(counter));
    }

    set cards(items: HTMLElement[]) {
        this.catalog.replaceChildren(...items);
    }

    set locked(locked: boolean) {
        this.toggleClass(this.wrapper,'page__wrapper_locked', locked);
    }
      
}