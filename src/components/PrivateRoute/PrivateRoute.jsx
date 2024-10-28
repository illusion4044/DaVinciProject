import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../redux/users/selectors';

const PrivateRoute = ({ component: Component, redirectTo }) => {
  const user = useSelector(selectUserInfo);
  return user.email ? <Component /> : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
