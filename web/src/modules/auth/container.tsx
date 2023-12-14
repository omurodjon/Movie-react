import { ReactNode, Component } from 'react';
import { Loader } from 'components';
import { session } from 'services';

import { Api, Mappers, Types } from '.';
import Context from './context';

interface ContainerState extends Pick<Types.IContext, 'user'> {
  isLoading: boolean;
}

interface ContainerProps {
  children: ReactNode;
}

export default class Container extends Component<ContainerProps, ContainerState> {
  state: ContainerState = {
    user: null,
    isLoading: !!session.get()
  };

  logout = () => {
    this.setState({ user: null });
    session.delete();
  };

  login = (user: Types.IEntity.User) => {
    this.setState({ user });
  };

  async componentDidMount() {
    const token = session.get();
    if (!token) return;

    const { data } = await Api.Profile();
    const user = Mappers.User(data);

    this.setState({ user, isLoading: false });
  }

  render() {
    if (this.state.isLoading) return <Loader />;

    return (
      <Context.Provider
        value={{
          user: this.state.user,
          methods: {
            login: this.login,
            logout: this.logout
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
