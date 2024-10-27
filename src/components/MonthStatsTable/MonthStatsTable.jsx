import React, { useState } from 'react';
import styles from './MonthStatsTable.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';

const MonthStatsTable = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  // Приклад даних для виконання норми по дням
  const stats = Array.from({ length: getDaysInMonth(selectedMonth, currentDate.getFullYear()) }, (_, day) => ({
    day: day + 1,
    waterPercentage: Math.floor(Math.random() * 100),
    dailyNorma: 2000, // Наприклад, 2000 мл норми в день
    servings: Math.floor(Math.random() * 10) + 1,
  }));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (direction) => {
    if (direction === 'prev' && selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    } else if (direction === 'next' && selectedMonth < currentDate.getMonth()) {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  return (
    <div className={styles.monthStatsTable}>
      {/* Пагінатор для вибору місяців */}
      <h2>Month</h2>
      <div className={styles.paginator}>
        <button onClick={() => handleMonthChange('prev')} disabled={selectedMonth === 0}>
          ←
        </button>
        <span>{months[selectedMonth]} {currentDate.getFullYear()}</span>
        {selectedMonth < currentDate.getMonth() && (
          <button onClick={() => handleMonthChange('next')}>→</button>
        )}
      </div>

      {/* Список днів з виконанням норми */}
      <div className={styles.daysList}>
        {stats.map((dayStat) => (
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

      {/* Детальна статистика для вибраного дня */}
      {selectedDay && (
        <DaysGeneralStats
          chosenDay={`${selectedDay.day}.${selectedMonth + 1}.${currentDate.getFullYear()}`}
          dailyNorma={`${selectedDay.dailyNorma} ml`}
          normFulfillment={`${selectedDay.waterPercentage}%`}
          servings={selectedDay.servings}
        />
      )}
    </div>
  );
};

export default MonthStatsTable;
