import React, { useState } from 'react';
import styles from './MonthStatsTable.module.css'; // Імпорт стилів
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats'; 

// Компонент для пагінації місяців
const MonthPaginator = ({ selectedMonth, onMonthChange }) => {
  const currentMonth = new Date().getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    if (selectedMonth > 0) {
      onMonthChange(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth < currentMonth) {
      onMonthChange(selectedMonth + 1);
    }
  };

  return (
    <div className={styles.monthPaginator}>
      <button onClick={handlePrevMonth} disabled={selectedMonth === 0} className={styles.paginatorButton}> Prev</button>
      <span className={styles.monthDisplay}>{months[selectedMonth]}</span>
      {selectedMonth < currentMonth && (
        <button onClick={handleNextMonth} className={styles.paginatorButton}>Next </button>
      )}
    </div>
  );
};

// Компонент для переліку днів місяця
const DaysList = ({ selectedMonth, daysStats, onDayClick, highlightedDay }) => {
  const daysInMonth = new Date(new Date().getFullYear(), selectedMonth + 1, 0).getDate();

  return (
    <div className={styles.daysList}>
      {[...Array(daysInMonth)].map((_, day) => {
        const dayStats = daysStats[day + 1] || { water: 0 };
        const isHighlighted = dayStats.water < 100; // Якщо план не виконано
        return (
          <div
            key={day}
            className={`${styles.dayBlock} ${isHighlighted ? styles.highlighted : ''}`}
            onClick={() => onDayClick(day + 1)}
          >
            <span>{day + 1}</span>
            <span>Water: {dayStats.water}%</span>
          </div>
        );
      })}
    </div>
  );
};

// Головний компонент сторінки
const MonthStatsTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [daysStats, setDaysStats] = useState({
    // Приклад даних по днях
    1: { water: 75 },
    2: { water: 100 },
    3: { water: 90 },
    // ...
  });

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setSelectedDay(null); // Скинути вибір дня при зміні місяця
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className={styles.monthStatsTable}>
      <MonthPaginator selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      <DaysList
        selectedMonth={selectedMonth}
        daysStats={daysStats}
        onDayClick={handleDayClick}
        highlightedDay={selectedDay}
      />
      {selectedDay && <DaysGeneralStats day={selectedDay} stats={daysStats[selectedDay]} />}
    </div>
  );
};

export default MonthStatsTable;
