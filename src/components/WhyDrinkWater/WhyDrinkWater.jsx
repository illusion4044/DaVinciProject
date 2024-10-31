import css from './WhyDrinkWater.module.css';
import sprite from "../../img/icons.svg"
console.log(sprite)

const WhyDrinkWater = () => {
  return (
    <>
      <div className={css.divWhyDrinkWater}>
        <h3 className={css.heading}>Why drink water</h3>
        <ul className={css.list}>
          <li className={css.iconText}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use href={`${sprite}#icon-waterList`} />
            </svg>
            <p className={css.iconParagraph}>
              Supply of nutrients to all organs
            </p>
          </li>
          <li className={css.iconText}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use href={`${sprite}#icon-waterList`}/>
            </svg>
            <p className={css.iconParagraph}>Providing oxygen to the lungs</p>
          </li>
          <li className={css.iconTextMod}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use
                href={`${sprite}#icon-waterList`}
                className={css.iconSvg}
              />
            </svg>
            <p className={css.iconParagraph}>
              Maintaining the work of the heart
            </p>
          </li>
          <li className={css.iconTextMod}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use href={`${sprite}#icon-waterList`} />
            </svg>
            <p className={css.iconParagraph}>Release of processed substances</p>
          </li>
          <li className={css.iconTextMod}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use href={`${sprite}#icon-waterList`} />
            </svg>
            <p className={css.iconParagraph}>
              Ensuring the stability of the internal environment
            </p>
          </li>
          <li className={css.iconTextMod}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use href={`${sprite}#icon-waterList`} />
            </svg>
            <p className={css.iconParagraph}>
              Maintaining within the normal temperature
            </p>
          </li>
          <li className={css.iconTextMod}>
            <svg width="8" height="8" className={css.iconSvg}>
              <use href={`${sprite}#icon-waterList`} />
            </svg>
            <p className={css.iconParagraph}>
              Maintaining an immune system capable of resisting disease
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default WhyDrinkWater;
