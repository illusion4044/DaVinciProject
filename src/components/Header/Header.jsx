import Logo from '../../img/logoImg/logo';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';

const Header = () => {
  // Retrieve user from Redux store
  const user = useSelector(selectUser);
  console.log('user:', user);

  return (
    <header className={css.header}>
      <a href="/home">
        <Logo />
      </a>
      {user?.email ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
};

export default Header;
