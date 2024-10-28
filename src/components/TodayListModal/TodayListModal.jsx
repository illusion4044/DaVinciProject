import { useDispatch, useSelector } from 'react-redux';
import {
  selectDailyNorma,
  selectSelectedItem,
  selectSelectedTime,
} from '../../redux/water/selectors.js';
import { useEffect, useState } from 'react';

import {
  addWaterPortionThunk,
  fetchDailyPortionsThunk,
  fetchMonthlyPortionsThunk,
  updatePortionThunk,
} from '../../redux/water/operations.js';
import css from './TodayListModal.module.css';
import dayjs from 'dayjs';
import { setSelectedTime } from '../../redux/water/slice.js';
import toast, { Toaster } from 'react-hot-toast';

export default function TodayListModal({ onClose }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem);

   const selectedTime = useSelector(selectSelectedTime);
  const dailyNorma = useSelector(selectDailyNorma) || 0;

  const [count, setCount] = useState(selectedItem ? selectedItem.amount : 0);
  const [inputValue, setInputValue] = useState(count);

const [isSaveDisabled, setIsSaveDisabled] = useState(true);
   const isFirstRecord = !selectedItem || Object.keys(selectedItem).length === 0;

  const handleDecrement = () => {

      if (count <= 0) {
        toast.error('The amount cannot be less than 0 ml.');
        return;
      }
    if (count > 0) {
      const newCount = Math.max(0, count - 50);
      setCount(newCount);
      setInputValue(newCount);
      setIsSaveDisabled(newCount <= 0);
    }
  };

  const handleIncrement = () => {

       if (count >= 1500) {
         toast.error('The amount cannot exceed 1500 ml.');
         return;
       }
    if (count < 1500) {
      const newCount = Math.min(1500, count + 50);
      setCount(newCount);
      setInputValue(newCount);
      setIsSaveDisabled(newCount > 1500);
    }
  };

const handleInputChange = event => {
  const value = event.target.value;
  const numericValue = Number(value);
  setInputValue(value);

  if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 1500) {
    setCount(numericValue);
    setIsSaveDisabled(numericValue <= 0);
  } else if (numericValue > 1500) {
    toast.error('The amount cannot exceed 1500 ml.');
  } else if (numericValue < 0) {
    toast.error('The amount cannot be less than 0 ml.');
  }
};

  const handleInputBlur = () => {
    const value = Number(inputValue);
    if (inputValue === '') {
      setCount(0);
      setIsSaveDisabled(true);
    } else if (value >= 0 && value <= 1500) {
      setCount(value);
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
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

     if (count <= 0) {
       toast.error('The amount must be greater than 0 ml.');
       return;
     }
     if (count > 1500) {
       toast.error('The amount cannot exceed 1500 ml.');
       return;
     }

    const normaValue = dailyNorma?.dailyNorma || 0;
    const consumeRatio =
      normaValue && count ? ((count / normaValue) * 100).toFixed(2) : 0;
    const payload = {
      id: selectedItem.id,
      amount: count,
      time: selectedTime,
      dailyNorma,
      consumeRatio,
    };

    console.log(payload);



    dispatch(addWaterPortionThunk(payload)).then(() => {
      const currentDate = getCurrentData();
      dispatch(fetchDailyPortionsThunk(currentDate));
      dispatch(fetchMonthlyPortionsThunk(currentDate));
    });
  };

    useEffect(() => {
      setInputValue(count);
    }, [count]);

 useEffect(() => {

   if (selectedItem && Object.keys(selectedItem).length > 0) {
     setCount(selectedItem.amount);
     setInputValue(selectedItem.amount);
     dispatch(setSelectedTime(selectedItem.time));
     setIsSaveDisabled(selectedItem.amount <= 0);
   } else {
     setCount(0);
     setInputValue(0);
     dispatch(setSelectedTime(dayjs().format('HH:mm')));
   }
 }, [selectedItem, dispatch]);

   const handleTimeChange = event => {
     dispatch(setSelectedTime(event.target.value));
   };

   const generateTimeOptions = () => {
     const options = [];
     for (let hour = 0; hour < 24; hour++) {
       for (let minute = 0; minute < 60; minute += 5) {
         const time = dayjs().hour(hour).minute(minute).format('HH:mm');
         options.push(time);
       }
     }
     return options;
   };

   const timeOptions = generateTimeOptions();


  return (
    <div className={css.modalContainer} onClick={handleBackdropClick}>
      <Toaster position="top-right" reverseOrder={false} />
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
            <select
              className={css.timeInput}
              value={selectedTime}
              onChange={handleTimeChange}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className={css.waterValue}>Enter the value of the water used:</h2>
          <input
            className={css.valueInput}
            type="number"
            value={inputValue}
            min={0}
            max={1500}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>

        <div className={css.saveContainer}>
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
}
