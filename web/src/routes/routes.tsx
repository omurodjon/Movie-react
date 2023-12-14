import { Routes as Switch, Route, Navigate, useNavigate } from 'react-router-dom';
import { Auth, Movie } from 'pages';
import Protected from './protected';
import { Context } from 'modules/auth';
import { useContext } from 'react';

const Routes = () => {
  const { user } = useContext(Context);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  return (
    <Switch>
      <Route path="movies">
        <Route index element={<Movie.Main/>} />

        <Route element={<Protected allowed={isAuthenticated} to="/auth/login" />}>
          <Route path="new" element={<Movie.Create />} />
          <Route path=":movieID" element={<Movie.Update />} />
        </Route>
      </Route>

      <Route path="auth" element={<Protected allowed={!isAuthenticated} to="/movies" />}>
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register navigate={navigate} />} />
        <Route index path="*" element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path="*" element={<Navigate to="/movies" />} />
    </Switch>
  );
};

export default Routes;
