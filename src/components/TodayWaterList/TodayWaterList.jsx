import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import { openTodayModal, closeTodayModal } from '../../redux/water/slice.js';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import { useState, useEffect } from 'react';
import {
  selectDailyNorma,
  selectSelectedItem,
} from '../../redux/water/selectors.js';
import dayjs from 'dayjs';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);
  const water = useSelector(selectDailyNorma);

  const { volume } = water;
  console.log(water);

  const selectedItem = useSelector(selectSelectedItem);
  const [count, setCount] = useState(selectedItem ? selectedItem.amount : 0);
  const [inputValue, setInputValue] = useState(count);
  const [selectedTime, setSelectedTime] = useState(
    selectedItem ? selectedItem.time : dayjs().format('HH:mm')
  );
  useEffect(() => {
    setCount(selectedItem ? selectedItem.amount : 0);
    setSelectedTime(selectedItem ? selectedItem.time : dayjs().format('HH:mm'));
  }, [selectedItem]);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const time = dayjs().hour(hour).minute(minute).format('HH:mm');
        console.log(time);
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const ml = JSON.stringify(water);
  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Today</p>
        {!onSaveClick && (
          <>

            <div className={css.containerList}>
              <ul>
                {timeOptions.map(time => (
                  <li key={time} value={time}>
                    <p className={css.amount}>{water} ml</p>
                    {time}
                    <svg className={css.iconGlass}>
                      <use href="src/img/icons.svg#icon-Group-4"></use>
                    </svg>
                    <svg className={css.iconPencil}>
                      <use href="/public/icons.svg#icon-Vector"></use>
                    </svg>
                    <svg className={css.iconTrash}>
                      <use href="src/img/icons.svg#icon-Vector"></use>
                    </svg>
                  </li>
                ))}
              </ul>

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
