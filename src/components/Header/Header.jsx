import { useState } from 'react';  // Import useState for modal handling
import Logo from '../../img/logo_img/logo';
import css from './Header.module.css';

import { UserLogoModal } from '../../components/UserLogoModal/UserLogoModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserLogo from '../../components/UserLogo/UserLogo';
import UserAuth from '../../components/UserAuth/UserAuth';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Define modal state

  // Define the toggleModal function to handle modal state
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  // Define getAvatarContent function (returns placeholder for now)
  const getAvatarContent = () => {
    return <span className={css.avatar}>Avatar</span>;  // You can customize this as needed
  };

  const user = useSelector(selectUser);
  console.log('user:', user);

  return (
    <header className={css.header}>
      <a href="/home">
        <Logo />
      </a>

      {user ? (
        <div className={css.user_block}>
          <p className={css.user_name}>{user.name || user.email}</p>
          <button onClick={toggleModal} className={css.user_button}>
            {getAvatarContent()}{' '}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.35331 10.8534C8.25956 10.947 8.13248 10.9996 7.99998 10.9996C7.86748 10.9996 7.7404 10.947 7.64665 10.8534L2.64665 5.85335C2.55833 5.75857 2.51024 5.63321 2.51253 5.50367C2.51481 5.37414 2.56729 5.25055 2.6589 5.15894C2.75051 5.06733 2.8741 5.01486 3.00363 5.01257C3.13316 5.01029 3.25853 5.05837 3.35331 5.14669L7.99998 9.79335L12.6466 5.14669C12.6924 5.09756 12.7476 5.05816 12.809 5.03083C12.8703 5.00351 12.9365 4.98881 13.0036 4.98763C13.0708 4.98644 13.1375 4.99879 13.1997 5.02394C13.262 5.04909 13.3185 5.08652 13.366 5.134C13.4135 5.18147 13.4509 5.23803 13.4761 5.30029C13.5012 5.36255 13.5136 5.42923 13.5124 5.49637C13.5112 5.5635 13.4965 5.62971 13.4692 5.69105C13.4418 5.75238 13.4024 5.80758 13.3533 5.85335L8.35331 10.8534Z"
                fill="#407BFF"
              />
            </svg>
          </button>
          {isModalOpen && <UserLogoModal toggleModal={toggleModal} />}
        </div>
      ) : (
        <a href="/login" className={css.sign_in_block_link}>
          <div className={css.sign_in_block}>
            Sign in
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_139_528)">
                <circle cx="14" cy="14" r="13.5" stroke="#2F2F2F" />
                <path
                  d="M17.5005 8.2564C17.5005 9.20846 17.1317 10.1215 16.4752 10.7947C15.8187 11.4679 14.9284 11.8461 14 11.8461C13.0716 11.8461 12.1813 11.4679 11.5248 10.7947C10.8683 10.1215 10.4995 9.20846 10.4995 8.2564C10.4995 7.30434 10.8683 6.39127 11.5248 5.71807C12.1813 5.04486 13.0716 4.66666 14 4.66666C14.9284 4.66666 15.8187 5.04486 16.4752 5.71807C17.1317 6.39127 17.5005 7.30434 17.5005 8.2564ZM7 21.7711C7.03 19.8875 7.78069 18.0915 9.09018 16.7703C10.3997 15.4492 12.163 14.7088 14 14.7088C15.837 14.7088 17.6003 15.4492 18.9098 16.7703C20.2193 18.0915 20.97 19.8875 21 21.7711C18.8039 22.8037 16.4159 23.3367 14 23.3333C11.5021 23.3333 9.13108 22.7743 7 21.7711Z"
                  stroke="#2F2F2F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_139_528">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </a>
      )}
      <UserLogoutModal/>

      {user.email ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
}
