import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';

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
