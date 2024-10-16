import css from './WaterСonsumptionTracker.module.css';

const WaterСonsumptionTracker = () => {
  return (
    <>
      <div className={css.divWaterConsumptionTracker}>
        <div className={css.divTitle}>
          <h1 className={css.title}>Water consumption tracker</h1>
          <h2 className={css.subtitle}>Record daily water intake and track</h2>
        </div>
        <div className={css.divTrackerBenefits}>
          <h3 className={css.headOfSubsections}>Tracker Benefits</h3>
          <div className={css.divSubsections}>
            <div>
              <h4 className={css.subsection}>Habit drive</h4>
            </div>
            <div>
              <h4 className={css.subsection}>View statistics</h4>
            </div>
            <div>
              <h4 className={css.subsection}>Personal rate setting</h4>
            </div>
          </div>
        </div>
        <button className={css.btn}>Try tracker</button>
      </div>
    </>
  );
};

export default WaterСonsumptionTracker;
