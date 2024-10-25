import css from './WaterСonsumptionTracker.module.css';

const WaterСonsumptionTracker = () => {
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
              <svg className={css.icon} width="32" height="32">
                <use
                  href="../../../public/welcomePage.svg#icon-calendar"
                  className={css.iconSizeWrap}
                />
              </svg>
              <p>Habit drive</p>
            </li>
            <li className={css.iconText}>
              <svg className={css.icon} width="32" height="32">
                <use
                  href="../../../public/welcomePage.svg#icon-statistic"
                  className={css.iconSizeWrap}
                />
              </svg>
              <p>View statistics</p>
            </li>
            <li className={css.iconText}>
              <svg className={css.icon} width="32" height="32">
                <use
                  href="../../../public/welcomePage.svg#icon-settings"
                  className={css.iconSizeWrap}
                />
              </svg>
              <p>Personal rate setting</p>
            </li>
          </ul>
        </div>
        <button className={css.btn}>Try tracker</button>
      </div>
    </>
  );
};

export default WaterСonsumptionTracker;
