import { useDispatch, useSelector } from 'react-redux';
import { selectDailyNorma, selectSelectedItem } from '../../redux/water/selectors.js';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  fetchDailyPortionsThunk,
  fetchMonthlyPortionsThunk,
  updatePortionThunk,
} from '../../redux/water/operations.js';

export default function TodayListModal({ onClose }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem);
  const dailyNorma = useSelector(selectDailyNorma) || 0;

  const [count, setCount] = useState(selectedItem ? selectedItem.amount : 0);
  const [inputValue, setInputValue] = useState(count);
  const [selectedTime, setSelectedTime] = useState(
    selectedItem ? selectedItem.time : dayjs().format('HH:mm')
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
    <div>
      <h1>Edit the entered amount of water</h1>

      {isFirstRecord ? <p>No notes yet</p> : null}

      <div>
        <svg>
          <use href=""></use>
        </svg>
        <p>{selectedItem ? selectedItem.amount : 0} ml</p>
        <p>{selectedItem ? selectedItem.time : '00:00'}</p>
      </div>

      <div>
        <h2>Correct entered data:</h2>
        <p>Amount of water:</p>
        <div>
          <button onClick={handleDecrement}>-</button>
          <span>{count} ml</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <label>Recording time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={event => setSelectedTime(event.target.value)}
          />
        </div>
      </LocalizationProvider>

      <div>
        <h2>Enter the value of the water used:</h2>
        <input
          type="number"
          value={inputValue}
          min={0}
          max={1500}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>

      <div>
        <p>{count} ml</p>
        <button onClick={onSaveClick} disabled={isSaveDisabled}>
          Save
        </button>
      </div>
    </div>
  );
}
