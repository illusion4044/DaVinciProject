import { Suspense } from 'react';
import Header from '../Header/Header';
import WelcomePage from "../../pages/WelcomePage/WelcomePage"

export const SharedLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <WelcomePage/>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
