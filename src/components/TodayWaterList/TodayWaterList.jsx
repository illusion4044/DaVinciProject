import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import { openTodayModal, closeTodayModal } from '../../redux/water/slice.js';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import {
  selectDailyNorma,
  selectSelectedTime,
} from '../../redux/water/selectors.js';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);
  const water = useSelector(selectDailyNorma);
  const time = useSelector(selectSelectedTime);
  const { volume } = water;
  console.log(water.dailyNorma);
  console.log(time);

  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Today</p>
        {!onSaveClick && (
          <>
            <div className={css.containerList}>
              <ul>
                <li className={css.amount}>{water.dailyNorma} ml</li>
                <li className={css.amount}>{time.date}</li>

                <svg className={css.iconGlass}>
                  <use href="src/img/icons.svg#icon-Group-4"></use>
                </svg>
                <svg className={css.iconPencil}>
                  <use href="/public/icons.svg#icon-Vector"></use>
                </svg>
                <svg className={css.iconTrash}>
                  <use href="src/img/icons.svg#icon-Vector"></use>
                </svg>
              </ul>
            </div>
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
