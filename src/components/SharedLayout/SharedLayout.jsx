import { Suspense } from 'react';
import Header from '../Header/Header';

export const SharedLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
