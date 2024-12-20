// src/components/App/App.jsx

import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsRefreshing,
  selectUser,
  selectToken,
} from '../../redux/auth/selectors';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Loader from '../Loader/Loader';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater.jsx';
import { getCurrentUser } from '../../redux/users/operations';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'));
const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));

export default function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  console.log('userToken:', userToken);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (userToken) {
      dispatch(getCurrentUser());
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
            path="/"
            element={<Navigate to={userToken ? '/home' : '/welcome'} />}
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
      <Toaster />
    </Suspense>
  );
}
