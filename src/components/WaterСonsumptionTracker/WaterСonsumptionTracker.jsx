import css from './WaterСonsumptionTracker.module.css';
import { useNavigate } from 'react-router-dom';

import sprite from "../../img/icons.svg"
console.log(sprite)

const WaterСonsumptionTracker = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/register'); // Переход на маршрут signUp
  };

  return (
    <>
      <div className={css.divWaterConsumptionTracker}>
        <div className={css.divTitle}>
          <h1 className={css.title}>Water consumption tracker</h1>
          <h2 className={css.subtitle}>Record daily water intake and track</h2>
        </div>
        <div className={css.trackerBenefits}>
          <h3 className={css.headOfSubsections}>Tracker Benefits</h3>
          <ul className={css.divSubsections}>
            <li className={css.iconText}>
              <svg className={css.icon}>
                <use
                  href={`${sprite}#icon-calendar`}
                  className={css.iconSizeWrap}
                />
              </svg>
              <p className={css.textWrap}>Habit drive</p>
            </li>
            <li className={css.iconText}>
              <svg className={css.icon}>
                <use
                  href={`${sprite}#icon-statistic`}
                  className={css.iconSizeWrap}
                />
              </svg>
              <p className={css.textWrap}>View statistics</p>
            </li>
            <li className={css.iconText}>
              <svg className={css.icon}>
                <use
                  href={`${sprite}#icon-settings`}
                  className={css.iconSizeWrap}
                />
              </svg>
              <p className={css.textWrap}>Personal rate setting</p>
            </li>
          </ul>
        </div>
        <button className={css.btn} onClick={handleButtonClick}>
          Try tracker
        </button>
      </div>
    </>
  );
};

export default WaterСonsumptionTracker;
