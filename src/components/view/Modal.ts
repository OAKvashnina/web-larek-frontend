import { Component } from "../base/Components";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected buttonClose: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this.buttonClose.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.toggleClass(this.container,'modal_active', true)
        this.events.emit('modal:open');
    }

    close() {
        this.toggleClass(this.container,'modal_active', false)
        this.content = null;
        this.events.emit('modal:close');
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}