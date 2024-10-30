import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MonthStatsTable.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import { fetchMonthlyPortionsThunk } from '../../redux/water/operations';
import { selectMonthlyPortions } from '../../redux/water/selectors';

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const monthlyPortions = useSelector(selectMonthlyPortions);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const selectedMonthString = `${currentYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
    dispatch(fetchMonthlyPortionsThunk(selectedMonthString));
  }, [dispatch, selectedMonth, currentYear]);

  const handleMonthChange = (direction) => {
    if (direction === 'prev' && selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
      setSelectedDay(null);
    } else if (direction === 'next' && selectedMonth < currentDate.getMonth()) {
      setSelectedMonth(selectedMonth + 1);
      setSelectedDay(null);
    }
  };

  return (
    <div className={styles.monthStatsTable}>

      {/* Пагінатор для вибору місяців */}
      <div className={styles.container}>
        <h2 className={styles.title}>Month</h2>
        <div className={styles.paginator}>
          <svg className={styles.svg} onClick={() => handleMonthChange('prev')} disabled={selectedMonth === 0}
          >
            <use href='../../img/icons.svg#icon-right'></use>
          </svg>
          <span>{months[selectedMonth]} {currentDate.getFullYear()}</span>
          {selectedMonth < currentDate.getMonth() && (
            <button onClick={() => handleMonthChange('next')}>→</button>
          )}
        </div>

      </div>

      <div className={styles.daysList}>
        {monthlyPortions.map((dayStat) => (
          <div
            key={dayStat.day}
            className={`${styles.dayBlock} ${dayStat.waterPercentage < 100 ? styles.incomplete : ''}`}
            onClick={() => setSelectedDay(dayStat)}
          >
            <span className={styles.dayNumber}>{dayStat.day}</span>
            <span className={styles.dayPercentage}>{dayStat.waterPercentage}%</span>
          </div>
        ))}
      </div>

      {selectedDay && (
        <DaysGeneralStats
          chosenDay={`${selectedDay.day}.${selectedMonth + 1}.${currentYear}`}
          dailyNorma={`${selectedDay.dailyNorma} ml`}
          normFulfillment={`${selectedDay.waterPercentage}%`}
          servings={selectedDay.servings}
        />
      )}
    </div>
  );
};

export default MonthStatsTable;
