import Logo from '../../img/logo_img/logo';
import css from './Header.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';

export default function Header() {
  // const user = {
  //   name: 'Davyd',
  //   email: 'fdavyd@example.com',
  // };
  const user = useSelector(selectUser);
  console.log('user:', user);

  // const user = null;

  return (
    <header className={css.header}>
      <a href="/home">
        <Logo />
      </a>
      {user.email ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
}
