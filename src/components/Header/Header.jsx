import Logo from '../../components/Logo/Logo';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';
import { selectUserInfo } from '../../redux/users/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Header = () => {
  // Retrieve user from Redux store
  // const user = useSelector(selectUserInfo);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <a href="/home">
        <Logo />
      </a>
      {isLoggedIn ? <UserLogo /> : <UserAuth />}
    </header>
  );
};

export default Header;
