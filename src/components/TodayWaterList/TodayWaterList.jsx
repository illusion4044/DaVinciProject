import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import { openTodayModal, closeTodayModal } from '../../redux/water/slice.js';
import { openModal, closeModal } from '../../redux/auth/slice';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
import {
  selectSelectedTime,
  selectVolume,
  selectDailyPortions,
} from '../../redux/water/selectors.js';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);
  const isOpen = useSelector(state => state.auth.isModalOpen);

  const time = useSelector(selectSelectedTime);
  const amount = useSelector(selectVolume);
  const dailyPortions = useSelector(selectDailyPortions);
  const id = dailyPortions.id;
  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Today</p>
        {onSaveClick && (
          <>
            <div className={css.containerList}>
              <ul className={css.list}>
                {dailyPortions.map(portion => (
                  <li key={portion._id}>
                    {portion.volume}
                    {/* <div className={css.amountAndTime}> */}
                    {/* <li className={css.amount}>{amount} ml</li>
                      <li className={css.time}>{time} PM</li> */}
                    {/* </div> */}
                    <div className={css.icons}>
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
                          <UserLogoutModal
                            onClose={() => dispatch(closeModal())}
                          />
                        )}
                        <use href="src/img/icons.svg#icon-Vector"></use>
                      </svg>
                    </div>
                  </li>
                ))}
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
                <AddWaterModal onClose={() => dispatch(closeTodayModal())} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
