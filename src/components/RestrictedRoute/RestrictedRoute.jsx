import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import PropTypes from 'prop-types';

const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

RestrictedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    redirectTo: PropTypes.string.isRequired,
};

export default RestrictedRoute;
