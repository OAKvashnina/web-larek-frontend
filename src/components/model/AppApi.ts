import { Api, ApiListResponse } from '../base/api';
import { ICard, IOrder, IOrderResult } from '../../types';

export interface IApi {
    getCards: () => Promise<ICard[]>;
    postOrder(order: IOrder): Promise<IOrderResult>
}

export class AppApi extends Api implements IApi {

    constructor(protected cdn: string, baseUrl: string, option?: object) {
        super(baseUrl, option);
    }

    getCards(): Promise<ICard[]> {
        return this.get('/product')
            .then((data: ApiListResponse<ICard>) =>
                data.items.map((data) => ({
                    ...data,
                    image: this.cdn + data.image
                }))
            );
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order)
            .then((data: IOrderResult) => data);
    }
}
