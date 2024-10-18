import css from './WaterСonsumptionTracker.module.css';

const WaterСonsumptionTracker = () => {
  return (
    <>
      <div className={css.divWaterConsumptionTracker}>
        <div className={css.divTitle}>
          <h1 className={css.title}>Water consumption tracker</h1>
          <h2 className={css.subtitle}>Record daily water intake and track</h2>
        </div>
        <div>
          <h3 className={css.headOfSubsections}>Tracker Benefits</h3>
          <div className={css.divSubsections}>
            <div className="icon-text">
              <svg className="icon">
                <use href="/path/to/src/img/icons.svg#icon-calendar-days" />
              </svg>
              <p>Habit drive</p>
            </div>
            <div className="icon-text">
              <svg className="icon">
                <use href="/path/to/src/img/icons.svg#icon-presentation-chart-bar" />
              </svg>
              <p>View statistics</p>
            </div>
            <div className="icon-text">
              <svg className="icon">
                <use href="/path/to/src/img/icons.svg#icon-wrench-screwdriver" />
              </svg>
              <p>Personal rate setting</p>
            </div>
          </div>
        </div>
        <button className={css.btn}>Try tracker</button>
      </div>
    </>
  );
};

export default WaterСonsumptionTracker;
