import Logo from '../Logo/Logo';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';
import { selectUserInfo } from '../../redux/users/selectors';

const Header = () => {
  // Retrieve user from Redux store
  const user = useSelector(selectUserInfo);
  console.log(user);
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
