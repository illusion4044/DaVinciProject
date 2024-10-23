import { useDispatch, useSelector } from 'react-redux';
import { selectDailyNorma, selectSelectedItem } from '../../redux/water/selectors.js';
import { useEffect, useState } from 'react';

import {
  fetchDailyPortionsThunk,
  fetchMonthlyPortionsThunk,
  updatePortionThunk,
} from '../../redux/water/operations.js';
import css from './TodayListModal.module.css'

export default function TodayListModal({ onClose }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem);
  const dailyNorma = useSelector(selectDailyNorma) || 0;

  const [count, setCount] = useState(selectedItem ? selectedItem.amount : 0);
  const [inputValue, setInputValue] = useState(count);
  const [selectedTime, setSelectedTime] = useState(
    selectedItem
      ? selectedItem.time
      : new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    count <= 0 || count > 1500
  );
  const isFirstRecord = !selectedItem;

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = Math.max(0, count - 50);
      setCount(newCount);
      setInputValue(newCount);
      setIsSaveDisabled(newCount <= 0);
    }
  };

  const handleIncrement = () => {
    if (count < 1500) {
      const newCount = Math.min(1500, count + 50);
      setCount(newCount);
      setInputValue(newCount);
      setIsSaveDisabled(newCount > 1500);
    }
  };

  const handleInputChange = event => {
    const value = Number(event.target.value);
    setInputValue(value);
  };

  const handleInputBlur = () => {
    if (inputValue >= 0 && inputValue <= 1500) {
      setCount(inputValue);
    }
  };

  const getCurrentData = () => {
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    currentDay = currentDay < 10 ? '0' + currentDay : currentDay;
    currentMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    return currentDay + '-' + currentMonth + '-' + currentYear;
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSaveClick = () => {
    const consumeRatio = dailyNorma / count;
    const payload = {
      id: selectedItem?.id,
      amount: count,
      time: selectedTime,
      dailyNorma,
      consumeRatio,
    };

    dispatch(updatePortionThunk(payload)).then(() => {
      const currentDate = getCurrentData();
      dispatch(fetchDailyPortionsThunk(currentDate));
      dispatch(fetchMonthlyPortionsThunk(currentDate));
    });
  };

  useEffect(() => {
    setCount(selectedItem ? selectedItem.amount : 0);
  }, [selectedItem]);

  return (
    <div className={css.modalContainer} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.headerContainer}>
          <h1 className={css.modalHeader}>Edit the entered amount of water</h1>
          <button onClick={onClose} className={css.closeButton}>
            <span>&times;</span>
          </button>
        </div>
        {isFirstRecord ? <p>No notes yet</p> : null}

        <div className={css.waterContainer}>
          <svg className={css.svg}>
            <use href="src/img/icons.svg#icon-Group-4"></use>
          </svg>

          <p className={css.amount}>
            {selectedItem ? selectedItem.amount : 0} ml
          </p>
          <p className={css.time}>
            {selectedItem ? selectedItem.time : '00:00'}
          </p>
        </div>

        <div>
          <h2 className={css.enteredData}>Correct entered data:</h2>
          <p className={css.amountText}>Amount of water:</p>
          <div className={css.buttonContainer}>
            <button className={css.minus} onClick={handleDecrement}>
              <svg className={css.svgMinus}>
                <use href="src/img/icons.svg#icon-minus-small"></use>
              </svg>
            </button>
            <span className={css.span}>{count} ml</span>
            <button className={css.plus} onClick={handleIncrement}>
              <svg className={css.svgPlus}>
                <use href="src/img/icons.svg#icon-minus-small"></use>
              </svg>
              <svg className={css.svgPlusSecond}>
                <use href="src/img/icons.svg#icon-minus-small"></use>
              </svg>
            </button>
          </div>
        </div>

         <div>
          <div className={css.recording}>
            <label className={css.timeText}>Recording time:</label>
            <input
              className={css.timeInput}
              type="time"
              value={selectedTime}
              onChange={event => setSelectedTime(event.target.value)}
            />
          </div>
        </div>


        <div>
          <h2 className={css.waterValue}>Enter the value of the water used:</h2>
          <input
            className={css.timeInput}
            type="number"
            value={inputValue}
            min={0}
            max={1500}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>

        <div>
          <p className={css.ml}>{count} ml</p>
          <button
            className={css.save}
            onClick={onSaveClick}
            disabled={isSaveDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
