import { IOrderData, IOrderForm, TFormErrors } from "../../types";
import { Model } from '../base/Model';

export class OrderData extends Model<IOrderData> {
    protected _order: IOrderForm= {
        payment: '',
        email: '',
        phone: '',
        address: '' 
    };

    getOrder() {
        return this._order;
    };

    setField(field: keyof IOrderForm, value: string) {
        this._order[field] = value;
        this.events.emit('orderData:change', this.validate());
    }
    
    validate() {
        const errors: TFormErrors  = {};
        !this._order.payment && (errors.payment = 'Необходимо указать способ оплаты');
        !this._order.address && (errors.address = 'Необходимо указать адрес');   
        !this._order.email && (errors.email = 'Необходимо указать email');
        !this._order.phone && (errors.phone = 'Необходимо указать телефон');
        return errors;
    }

    reset() {
        Object.keys(this._order).forEach((key:keyof typeof this._order) => {
            this._order[key] = '';
          });
    }
}