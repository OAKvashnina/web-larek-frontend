export type TCardCategory = 'софт-скил' | 'хард-скил' | 'другое' | 'дополнительное' | 'кнопка';

export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: TCardCategory;
    price: number | null;
}

export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
}

export interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}

export interface ICardsData {
    cards: ICard[];
    setCards(cards: ICard[]): void;
    getCards(): ICard[];
}

export interface IBasketData {
    cards: ICard[];
    addCard(card: ICard): void;
    getCards(): void;
    getCardsList(): string[];
    delCard(_id: string): void;
    delCards(): void;
    getTotalPrice(): void;
    include(_id: string): boolean;
    count(): number;
}

export interface IOrderData {
    order: IOrderForm;
    setField(field: keyof IOrderForm, value: string): void;
    getOrder(): IOrderForm;
    validate(): TFormErrors;
    reset(): void;
}

export interface IOrderResult {
    id: string[];
    total: number;
}

export type TCardCatalog = Pick<ICard, 'category' | 'image' | 'title' | 'price'>;
export type TCardPreview = Pick<ICard, 'description'> & TCardCatalog;
export type TCardBasket = Pick<ICard, 'title' | 'price'> & { sequence: number; }
export type TFormErrors = Partial<Record<keyof IOrderForm, string>>;