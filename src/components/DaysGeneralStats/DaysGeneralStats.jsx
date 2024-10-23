import css from './DaysGeneralStats.module.css';
import moment from 'moment';

export const DaysGeneralStats = ({
  chosenDay,
  dailyNorma,
  normFulfillment,
  servings
}) => {

  function convertFormat(date) {
        const date = moment(date, 'DD.MM.YYYY');
        return date.format('D, MMMM');
  }

  const convertedDate = convertFormat(chosenDay);

  return (
     <div className={css.statsContainer}>
      <h3 className={css.containerTitle}>{convertedDate}</h3>
      <p className={css.statsField}>Daily norma: <span className={css.statsValue}>{dailyNorma}</span></p>
      <p className={css.statsField}>Fulfillment of the daily norm: <span className={css.statsValue}>{normFulfillment}</span></p>
      <p className={css.statsField}>How many servings of water: <span className={css.statsValue}>{servings}</span></p>
    </div>
  )
}
