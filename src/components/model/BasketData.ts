import { Model } from "../base/Model";
import { IBasketData, ICard } from "../../types";

export class BasketData extends Model<IBasketData> {
    protected _cards: ICard[] = [];

    addCard(card: ICard) {
        this._cards.push(card);
        this.events.emit('basket:changed');
    }

    getCards() {
        return this._cards;
    }

    getCardsList() {
        return this._cards.map(item => item.id);
    }

    include(id: string) {
        return this._cards.some((item) => item.id === id);
    }

    delCard(id: string) {
        const cardsBasket = this._cards.filter((item) => item.id !== id);
        this._cards = cardsBasket;
        this.events.emit('basket:changed');
    }

    getTotalPrice() {
        return this._cards.length == 0 ? 0 : this._cards.reduce((sum, item) => sum + item.price, 0);
    }

    count() {
        return this._cards.length;
    }

    delCards(): void {
        this._cards = [];
        this.events.emit('basket:changed');
    }

}