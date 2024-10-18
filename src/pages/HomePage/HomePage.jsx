import DailyNorma from '../components/Stats/DailyNorma.js';
import WaterRatioPanel from '../components/Trackers/WaterRatioPanel.js';
import TodayWaterList from '../components/Stats/TodayWaterList.js';
import MonthStatsTable from '../components/Stats/MonthStatsTable.js';

export default function HomePage() {
  return (
    <>
      <DailyNorma />
      <WaterRatioPanel />
      <TodayWaterList />
      <MonthStatsTable />
    </>
  );
}
