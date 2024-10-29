import Logo from '../../components/Logo/Logo';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';
import { selectUserInfo } from '../../redux/users/selectors';

const Header = () => {
  const user = useSelector(selectUserInfo);
  return (
    <header className={css.header}>
      <a href="/home">
        <Logo />
      </a>
      {user.email ? <UserLogo /> : <UserAuth />}
    </header>
  );
};

export default Header;
