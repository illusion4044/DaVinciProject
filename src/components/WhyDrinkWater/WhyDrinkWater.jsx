import css from './WhyDrinkWater.modules.css';

const WhyDrinkWater = () => {
  return (
    <>
      <div className={css.divWhyDrinkWater}>
        <h3 className={css.heading}>Why drink water</h3>
        <ul className={css.list}>
          <li className={css.listItems}>Supply of nutrients to all organs</li>
          <li className={css.listItems}>Providing oxygen to the lungs</li>
          <li className={css.listItems}>Maintaining the work of the heart</li>
          <li className={css.listItems}>Release of processed substances</li>
          <li className={css.listItems}>
            Ensuring the stability of the internal environment
          </li>
          <li className={css.listItems}>
            Maintaining within the normal temperature
          </li>
          <li className={css.listItems}>
            Maintaining an immune system capable of resisting disease
          </li>
        </ul>
      </div>
    </>
  );
};

export default WhyDrinkWater;
