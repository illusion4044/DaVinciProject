import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.container}>
        <div className={css.dailyNorma }><DailyNorma /></div>
        <div className={css.waterRatioPanel}><WaterRatioPanel /></div>
        <div className={css.listAndTable}>
            <TodayWaterList />
            <MonthStatsTable />
        </div>
    </div>
  );
}
