import WaterСonsumptionTracker from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker';
import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater';

import css from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={css.welcomePage}>
      <WaterСonsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};

export default WelcomePage;
