import React from 'react';
import css from './UserLogo.module.css';
import { useState } from 'react';
import { UserLogoModal } from '../../components/UserLogoModal/UserLogoModal';
import { selectUserInfo } from '../../redux/users/selectors';
import { useSelector } from 'react-redux';

export default function UserLogo() {
  const user = useSelector(selectUserInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const getAvatarContent = () => {
    if (user.photo) {
      return (
        <img className={css.user_avatar} src={user.photo} alt={user.name} />
      );
    }

    const firstLetter = user.name
      ? user.name[0].toUpperCase()
      : user.email
      ? user.email[0].toUpperCase()
      : 'U';
    return <div className={css.user_avatar_placeholder}>{firstLetter}</div>;
  };
  return (
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
  );
}
