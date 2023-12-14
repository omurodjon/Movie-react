import { http } from 'services';
import { IApi } from './types';

export const Genre = {
	List: () => http.get<IApi.Genre.List.Response>('/genres'),
	Create: (data: IApi.Genre.Create.Request) => http.post<IApi.Genre.Create.Response>('/genres'),
};

export const Movie = {
	// for list
	List: () => http.get<IApi.Movie.List.Response>('/movies'),

	// for single
	Single: ({ movieId }: IApi.Movie.Single.Request) =>
		http.get<IApi.Movie.Single.Response>(`/movies/${movieId}`),

	// for delete
	Delete: ({ movieId }: IApi.Movie.Delete.Request) =>
		http.delete<IApi.Movie.Delete.Response>(`/movies/${movieId}`),

	// for update
	Update: ({ movieId, genreId, stock, rate, title }: IApi.Movie.Update.Request) =>
		http.put<IApi.Movie.Update.Response>(`/movies/${movieId}`, {
			title,
			genreId,
			numberInStock: stock,
			dailyRentalRate: rate,
		}),

	Create: ({ genreId, stock, rate, title }: IApi.Movie.Create.Request) =>
		http.post(`/movies`, { title, genreId, numberInStock: stock, dailyRentalRate: rate }),
};
