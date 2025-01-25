import { ICard, ICardsData } from "../../types";
import { Model } from '../base/Model';

export class CardData  extends Model<ICardsData> {
    protected _cards: ICard[] = [];

    setCards(cards: ICard[]) {
        this._cards = cards;
        this.events.emit('cards:changed');
    }

    getCards() {
        return this._cards;
    }
}