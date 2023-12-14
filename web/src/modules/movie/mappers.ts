import get from 'lodash/get';
import { IEntity } from './types';

export const Genre = (item?: any): IEntity.Genre => ({
	id: get(item, '_id') || '',
	name: get(item, 'name') || '',
});

export const Movie = (item?: any): IEntity.Movie => ({
	id: get(item, '_id'),
	title: get(item, 'title'),
	stock: get(item, 'numberInStock') || 0,
	rate: get(item, 'dailyRentalRate') || 0,
	genre: Genre(get(item, 'genre')),
	owner: get(item, 'username'),
	isLike: false,
});
