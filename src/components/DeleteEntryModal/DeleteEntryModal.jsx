import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/auth/slice.js';
import {
  deletePortionThunk,
  fetchDailyPortionsThunk,
  fetchMonthlyPortionsThunk,
} from '../../redux/water/operations.js';
import { selectSelectedItem } from '../../redux/water/selectors.js';
import css from './DeleteEntryModal.module.css';


export default function DeleteEntryModal() {
  const dispatch = useDispatch();

  const dailyPortions = useSelector(selectSelectedItem);


  const getCurrentDate = () => {
    return dayjs().format('YYYY-MM-DD');
  };

  const formingTodayDate = today => {
    const formattedDate = dayjs(today).format('DD-MM-YYYY');
    return formattedDate;
  };

const onDeleteClick = () => {


  dispatch(deletePortionThunk(dailyPortions._id)).then(() => {
    dispatch(closeModal());
    const today = new Date();
    const currentDate = getCurrentDate();
    dispatch(fetchDailyPortionsThunk(formingTodayDate(today)));
    dispatch(fetchMonthlyPortionsThunk(currentDate));
  });
};

  return (
    <div className={css.modalContainer}>
      <div className={css.modal}>
        <div className={css.headerContainer}>
          <h1 className={css.header}>Delete entry</h1>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className={css.closeButton}
          >
            <span>&times;</span>
          </button>
        </div>

        <p className={css.text}>Are you sure you want to delete the entry?</p>
        <div className={css.buttonContainer}>
          <button className={css.delete} onClick={onDeleteClick}>Delete</button>
        <button className={css.cancel}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </button></div>

      </div>
    </div>
  );
}
