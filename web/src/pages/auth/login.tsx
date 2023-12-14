import { Form } from 'components';
import { Api, Context, Types } from 'modules/auth';
import toast from 'react-hot-toast';
import { session } from 'services';
import * as yup from 'yup';

export default class Login extends Form<Types.IForm.Login> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  state = {
    values: { email: '', password: '' },
    errors: {},
    isLoading: false
  };

  schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  });

  doSubmit = async (values: Types.IForm.Login) => {
    this.setState({ isLoading: true });

    try {
      const { data } = await Api.Login(values);
      session.set(data.data);

      const { data: user } = await Api.Profile();
      this.context.methods.login(user);

      toast.success(`Successfully Logged In ${values.email}`);
    } catch (error: any) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}
