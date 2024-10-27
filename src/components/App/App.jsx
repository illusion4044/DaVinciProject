// src/components/App/App.jsx

import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing, selectUser } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Loader from '../Loader/Loader';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'));
const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));

export default function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (userToken) {
      dispatch(refreshUser());
    }
  }, [dispatch, userToken]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            path="/welcome"
            element={
              <RestrictedRoute component={WelcomePage} redirectTo="/home" />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={SignupPage} redirectTo="/login" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={SigninPage} redirectTo="/home" />
            }
          />
          <Route
            path="/home"
            element={<PrivateRoute component={HomePage} redirectTo="/login" />}
          />
          <Route path="/why-drink-water" element={<WhyDrinkWater />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
