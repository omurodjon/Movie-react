import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Context } from 'modules/auth';

const Navbar = () => {
  const { user, methods } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container-fluid d-flex justify-content-start">
        <Link className="navbar-brand" to="/movies">
          FlexTV
        </Link>
        {user ? (
          <ul className="nav">
            <li className="nav-item">
              <button className="nav-link text-dark">{user.name}</button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-dark" onClick={methods.logout}>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="nav">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link text-dark ${isActive ? 'active' : ''}`} to="/auth/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link text-dark ${isActive ? 'active' : ''}`} to="/auth/register">
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
