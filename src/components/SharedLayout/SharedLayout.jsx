import { Suspense } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

export const SharedLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
