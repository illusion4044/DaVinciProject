import Logo from '../../img/logo_img/logo';
import css from './Header.module.css';
import { useSelector } from 'react-redux';

import { selectUser as selectUserInfo } from '../../redux/users/selectors';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';

const Header = () => {
  const user = useSelector(selectUserInfo);

  return (
    <header className={css.header}>
      <a href="/home">
        <Logo />
      </a>
      {user.email ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
};

export default Header;
