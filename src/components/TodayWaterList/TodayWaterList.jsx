import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import { openTodayModal, closeTodayModal } from '../../redux/water/slice.js';
import { openModal, closeModal } from '../../redux/auth/slice';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import {
  selectSelectedTime,
  selectVolume,
  // selectSelectedAmount,
} from '../../redux/water/selectors.js';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);
  const isOpen = useSelector(state => state.auth.isModalOpen);

  const time = useSelector(selectSelectedTime);
  const amount = useSelector(selectVolume);

  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Today</p>
        {onSaveClick && (
          <>
            <div className={css.containerList}>
              <ul className={css.list}>
                <svg className={css.iconGlass}>
                  <use href="src/img/icons.svg#icon-Group-4"></use>
                </svg>
                <li className={css.amount}>{amount} ml</li>
                <li className={css.time}>{time} PM</li>

                <svg
                  className={css.iconPencil}
                  onClick={() => dispatch(openTodayModal())}
                >
                  <use href="/public/icons.svg#icon-Vector"></use>
                </svg>
                <svg
                  className={css.iconTrash}
                  onClick={() => dispatch(openModal())}
                >
                  {isOpen && (
                    <UserLogoutModal onClose={() => dispatch(closeModal())} />
                  )}
                  <use href="src/img/icons.svg#icon-Vector"></use>
                </svg>
        
              </ul>
            </div>
            <div className={css.line}></div>
          </>
        )}

        {onSaveClick && (
          <>
            <div className={css.containerBtn}>
              <p className={css.btn} onClick={() => dispatch(openTodayModal())}>
                <svg className={css.iconBtn}>
                  <use href="src/img/icons.svg#icon-outline"></use>
                </svg>
                Add Water
              </p>
              {isModalOpen && (
                <TodayListModal onClose={() => dispatch(closeTodayModal())} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
