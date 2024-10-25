import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <DailyNorma className={css.dailyNorma}/>
      <div className={css.container}>
        <div className={css.bottle}></div>
        <WaterRatioPanel />
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </div>
  );
}
