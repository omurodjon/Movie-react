import { Form } from 'components';
import { IOption } from 'components/select';
import { Api, Mappers } from 'modules/movie';
import { IForm } from 'modules/movie/types';
import toast from 'react-hot-toast';

import * as yup from 'yup';

export default class Create extends Form<IForm.Movie.Create> {
	state = {
		values: {
			title: '',
			stock: '' as unknown as number,
			rate: '' as unknown as number,
			genreId: '',
		},
		errors: {},
		isLoading: false,
		options: [],
	};

	schema = yup.object({
		title: yup.string().min(5).required().label('Title'),
		stock: yup.number().min(0).max(1000).typeError('Please enter a number').label('Stock'),
		rate: yup.number().min(0).max(1000).typeError('Please enter a number').label('Rate'),
		genreId: yup.string().required().label('Genre'),
	});

	doSubmit = async (values: IForm.Movie.Create) => {
		this.setState({ isLoading: true });
		try {
			await Api.Movie.Create(values);
			toast.success('Movie successfully created 🎁');
		} catch (error: any) {
		} finally {
			this.setState({ isLoading: false });
		}
	};

	async componentDidMount() {
		this.setState({ isLoading: true });
		try {
			const { data } = await Api.Genre.List();
			const genres = (data || []).map(Mappers.Genre);

			const options: IOption[] = genres.map(({ id, name }) => ({ value: id, label: name }));
			this.setState({ options, isLoading: false } as any);
		} catch (err: any) {
			this.setState({ isLoading: false });
		}
	}

	render() {
		return (
			<div className="container">
				<h1>New Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genreId', 'Genre', this.state.options)}
					{this.renderInput('stock', 'Number in stock', 'number')}
					{this.renderInput('rate', 'Daily rental rate', 'number')}
					{this.renderButton('Create')}
				</form>
			</div>
		);
	}
}
