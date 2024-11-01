import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  deletePortionThunk,
  fetchDailyPortionsThunk,
  fetchMonthlyPortionsThunk,
} from '../../redux/water/operations.js';
import css from './DeleteEntryModal.module.css';


export default function DeleteEntryModal({id, onClose}) {
const dispatch = useDispatch();

const getCurrentDate = () => {
  return dayjs().format('YYYY-MM-DD');
};

const formingTodayDate = today => {
  const formattedDate = dayjs(today).format('YYYY-MM-DD');
  return formattedDate;
};

const onDeleteClick = () => {
  dispatch(deletePortionThunk(id)).then(() => {
    const today = new Date();
    const currentDate = getCurrentDate();
    dispatch(fetchDailyPortionsThunk(formingTodayDate(today)));
    console.log(formingTodayDate(today));
    
    dispatch(fetchMonthlyPortionsThunk(currentDate));
  });
  onClose();
};

return (
  <div className={css.modalContainer}>
    <div className={css.modal}>
      <div className={css.headerContainer}>
        <h1 className={css.header}>Delete entry</h1>
          <button
            onClick={onClose}
            className={css.closeButton}
          >
            <span>&times;</span>
          </button>
        </div>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
      <div className={css.buttonContainer}>
        <button className={css.delete} onClick={onDeleteClick}>Delete</button>
        <button className={css.cancel}
          onClick={onClose}
        >
          Cancel
        </button></div>

      </div>
    </div>
  );
}
