import { IApi, ICard } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getCards(): Promise<ICard[]> {
		return this._baseApi.get<ICard[]>(`/product`).then((cards: ICard[]) => cards);
	}
    /*addCard(data: TCardInfo): Promise<ICard> {
		return this._baseApi.post<ICard>(`/cards`, data).then((card: ICard) => card);
	}*/

	/*getUser(): Promise<IUser> {
		return this._baseApi.get<IUser>(`/users/me`).then((user: IUser) => user);
	}

	

	removeCard(cardID: string): Promise<{ message: string }> {
		return this._baseApi.post<{ message: string }>(`/cards/${cardID}`, {}, 'DELETE').then(
			(res: { message: string }) => res
		);
	}

	setUserInfo(data: TUserBaseInfo): Promise<IUser> {
		return this._baseApi.post<IUser>(`/users/me`, data, 'PATCH').then((res: IUser) => res);
	}

	setUserAvatar(data: TUserAvatar): Promise<IUser> {
		return this._baseApi.post<IUser>(`/users/me/avatar`, data, 'PATCH').then(
			(res: IUser) => res
		);
	}

	changeLikeCardStatus(cardID: string, like: boolean): Promise<ICard> {
		const method = like ? 'DELETE' : 'PUT';
		return this._baseApi.post<ICard>(`/cards/like/${cardID}`, {}, method).then(
			(res: ICard) => res
		);
	}*/
}