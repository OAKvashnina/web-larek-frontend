export type CardCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface ICard {
    id: string;
   // description: string;
    image: string;
    title: string;
   // category: CardCategory;
    //price: number | null;
}

export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
}

export interface IOrder extends IOrderForm {
    items: string[]
}
//--------------- под вопросом
export interface ICardsData {
    cards: ICard[];
    preview: string | null;
    addCard(card: ICard): void;
    getCard(cardId: string): ICard;
  
	//deleteCard(cardId: string, payload: Function | null): void;
	//updateCard(card: ICard, payload: Function | null): void;
}
// ----------------под вопросом
export interface IOrderFormData {
    setOrder(order: IOrderForm): void;
}

//export type IGalleryCard = Pick<ICard, 'id' | 'category' | 'image' | 'title' | 'price'>;

//export type IBasketCard = Pick<ICard, 'id' | 'title' | 'price'> & {
 //   sequence: number
//}
//-------------- под вопросом
export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
    id: string;
    total: number;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' ;

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, metod?: ApiPostMethods): Promise<T>;
}