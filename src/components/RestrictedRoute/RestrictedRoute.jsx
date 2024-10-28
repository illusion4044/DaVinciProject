import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import PropTypes from 'prop-types';
import { selectUserInfo } from '../../redux/users/selectors';

const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const user = useSelector(selectUserInfo);
  return user.email ? <Navigate to={redirectTo} /> : <Component />;
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default RestrictedRoute;
