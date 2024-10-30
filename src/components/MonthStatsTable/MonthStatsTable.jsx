import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMonthlyPortionsThunk } from '../../redux/water/operations'; 
import styles from './MonthStatsTable.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';

const MonthStatsTable = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dispatch = useDispatch();
  const monthlyPortions = useSelector((state) => state.water.monthlyPortions) || []; 

  useEffect(() => {
    // Fetch the monthly portions data whenever the selected month changes
    dispatch(fetchMonthlyPortionsThunk({ month: selectedMonth, year: currentYear }));
  }, [dispatch, selectedMonth, currentYear]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const stats = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, currentYear);
    const monthStats = Array.from({ length: daysInMonth }, (_, day) => {
      // Знаходимо відповідні дані по дням
      const dayData = monthlyPortions.find((portion) => new Date(portion._id).getDate() === day + 1) || {
        totalVolume: 0, 
        servings: 0, 
        percent: 0,
      };

      return {
        day: day + 1,
        waterPercentage: dayData.percent,
        dailyNorma: dayData.totalVolume, // Припустимо, що totalVolume - це ваша норма на день
        servings: dayData.servings,
      };
    });

    return monthStats;
  }, [selectedMonth, currentYear, monthlyPortions]);

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
      {/* Paginator for month selection */}
      <div className={styles.container}>
        <h2 className={styles.title}>Month</h2>
        <div className={styles.paginator}>
          <svg className={styles.svg} onClick={() => handleMonthChange('prev')} disabled={selectedMonth === 0}>
            <use href='../../img/icons.svg#icon-right'></use>
          </svg>
          <span>{months[selectedMonth]} {currentYear}</span>
          {selectedMonth < currentDate.getMonth() && (
            <button onClick={() => handleMonthChange('next')}>→</button>
          )}
        </div>
      </div>

      {/* List of days with water intake stats */}
      <div className={styles.daysList}>
        {stats.map((dayStat) => (
          <div key={dayStat.day} onClick={() => setSelectedDay(dayStat)}>
            <div
              className={`${styles.dayBlock} ${
                dayStat.waterPercentage < 100 ? styles.incomplete : ''
              }`}
            >
              <span className={styles.dayNumber}>{dayStat.day}</span>
            </div>
            <span className={styles.dayPercentage}>{dayStat.waterPercentage}%</span>
          </div>
        ))}
      </div>

      {/* Detailed stats for selected day */}
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
