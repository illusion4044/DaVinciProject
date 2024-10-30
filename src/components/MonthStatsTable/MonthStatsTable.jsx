import React, { useState, useMemo } from 'react';
import styles from './MonthStatsTable.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';

const MonthStatsTable = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  
  const stats = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, currentYear);
    return Array.from({ length: daysInMonth }, (_, day) => {
      let waterPercentage = Math.floor(Math.random() * 101);

      //Ranomizer TEST
      if (Math.random() < 0.2) { 
        waterPercentage = 100;
      }

      return {
        day: day + 1,
        waterPercentage,
        dailyNorma: 2000, // Приклад: 2000 мл норми в день
        servings: Math.floor(Math.random() * 10) + 1,
      };
    });
  }, [selectedMonth, currentYear]);

  const handleMonthChange = (direction) => {
    if (direction === 'prev' && selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
      setSelectedDay(null); // Скидаємо вибір дня при зміні місяця
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
