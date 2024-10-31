import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import onSaveClickAddModal from '../AddWaterModal/AddWaterModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import {
  openTodayModal,
  closeTodayModal,
  openAddModal,
  closeAddModal,
  openDeleteModal,
  closeDeleteModal,
} from '../../redux/water/slice.js';

import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
import { selectDailyPortions } from '../../redux/water/selectors.js';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import DeleteEntryModal from '../DeleteEntryModal/DeleteEntryModal.jsx';
import { useEffect } from 'react';
import { fetchDailyPortionsThunk } from '../../redux/water/operations';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const isEditModalOpen = useSelector(state => state.water.isTodayModalOpen);
  const isAddModalOpen = useSelector(state => state.water.isAddModalOpen);
  const isDeleteModalOpen = useSelector(state => state.water.isDeleteModalOpen);

  const dailyPortions = useSelector(selectDailyPortions);

  useEffect(() => {
    dispatch(fetchDailyPortionsThunk(new Date()));
  }, [dispatch]);

  return (
    <>
      <div className={css.containerMain}>
        <p className={css.name}>Today</p>

        <>
          <div className={css.container}>
            <div className={css.scrollContainer}>
              <ul className={css.containerList}>
                {dailyPortions.map(portion => (
                  <li className={css.list} key={portion._id}>
                    <svg className={css.iconGlass}>
                      <use href="src/img/icons.svg#icon-Group-4"></use>
                    </svg>
                    <p className={css.amount}> {portion.volume} ml</p>
                    <p className={css.time}>{portion.date?.split('T')[1]}</p>

                    <div className={css.icons}>
                      <svg
                        className={css.iconPencil}
                        onClick={() => dispatch(openTodayModal())}
                      >
                        {isEditModalOpen && (
                          <TodayListModal
                            onClose={() => dispatch(closeTodayModal())}
                          />
                        )}
                        <use href="/public/icons.svg#icon-Vector"></use>
                      </svg>
                      <svg
                        className={css.iconTrash}
                        onClick={() => dispatch(openDeleteModal())}
                      >
                        {isDeleteModalOpen && (
                          <DeleteEntryModal
                            onClose={() => dispatch(closeDeleteModal())}
                          />
                        )}
                        <use href="src/img/icons.svg#icon-Vector"></use>
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>

        <>
          <div className={css.containerBtn}>
            <p className={css.btn} onClick={() => dispatch(openAddModal())}>
              <svg className={css.iconBtn}>
                <use href="src/img/icons.svg#icon-outline"></use>
              </svg>
              Add Water
            </p>
            {isAddModalOpen && (
              <AddWaterModal onClose={() => dispatch(closeAddModal())} />
            )}
          </div>
        </>
      </div>
    </>
  );
}
