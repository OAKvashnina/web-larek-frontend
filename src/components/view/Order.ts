import { Component } from "../base/Components";
import { ensureElement, ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IOrderForm } from "../../types";

interface IError {
    valid: boolean;
    error: string;
}

export class Order<T> extends Component<T> {
    protected _errors: HTMLSpanElement;
    protected submit: HTMLButtonElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLSpanElement>('.form__errors', this.container);
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit('order:change', { field, value });
    }

    set valid(value: boolean) {
        this.setDisabled(this.submit, !value);
        this.toggleClass(this._errors, 'modal__message_error', !value);
    }

    set error(value: string) {
        this.setText(this._errors, value);

    }
}

export class OrderForm extends Order<IOrderForm & IError> {
    protected paymentButtons: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this.paymentButtons = ensureAllElements<HTMLButtonElement>('button[type=button]', container);
        this.paymentButtons?.forEach(button => {
            button.addEventListener('click', () => {
                this.onInputChange('payment', button.name);
            });
        });
    }

    set payment(value: string) {
        this.paymentButtons.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === value);
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}

export class ContactsForm extends Order<IOrderForm & IError> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
}