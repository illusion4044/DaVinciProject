import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import selectedItem from '../TodayListModal/TodayListModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import { openTodayModal, closeTodayModal } from '../../redux/water/slice.js';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);

  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Today</p>
        {!onSaveClick && (
          <>
            <div className={css.scrollContainer}>
              <div className={css.containerList}>
                <svg className={css.iconGlass}>
                  <use href="src/img/icons.svg#icon-Group-4"></use>
                </svg>
                <p className={css.amount}>
                  {selectedItem ? selectedItem.amount : '0'} ml
                </p>
                <p className={css.time}>
                  {selectedItem ? selectedItem.time : '00:00'}
                </p>
                <svg className={css.iconPencil}>
                  <use href="/public/icons.svg#icon-Vector"></use>
                </svg>
                <svg className={css.iconTrash}>
                  <use href="src/img/icons.svg#icon-Vector"></use>
                </svg>
              </div>
            </div>
          </>
        )}
        {onSaveClick && (
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
        )}
      </div>
    </>
  );
}
