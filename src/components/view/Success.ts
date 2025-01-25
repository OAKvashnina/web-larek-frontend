import { Component } from "../base/Components";
import { IOrderResult } from "../../types";
import {ensureElement} from "../../utils/utils";

interface ISuccess {
    onClick: () => void;
}

export class Success extends Component<IOrderResult> {
    protected description: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(protected container: HTMLElement, actions: ISuccess) {
        super(container);
        
        this.description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this.button.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        this.setText(this.description, `Списано ${value} синапсов`);
    }
}