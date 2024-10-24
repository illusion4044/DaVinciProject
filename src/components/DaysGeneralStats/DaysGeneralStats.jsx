import css from './DaysGeneralStats.module.css';
import moment from 'moment';

const DaysGeneralStats = ({
  chosenDay,
  dailyNorma,
  normFulfillment,
  servings
}) => {

  function convertFormat(fullDate) {
        const date = moment(fullDate, 'DD.MM.YYYY');
        return date.format('D, MMMM');
  }

  const convertedDate = convertFormat(chosenDay);

  return (
     <div className={css.dailyStatsContainer}>
      <h3 className={css.containerTitle}>{convertedDate}</h3>
      <span className={css.statContainer}>
        <p className={css.statsField}>Daily norma:</p>
        <p className={css.statsValue}>{dailyNorma}</p>
      </span>
      <span className={css.statContainer}>
        <p className={css.statsField}>Fulfillment of the daily norm:</p>
        <p className={css.statsValue}>{normFulfillment}</p>
      </span>
      <span className={css.statContainer}>
        <p className={css.statsField}>How many servings of water:</p>
        <p className={css.statsValue}>{servings}</p>
      </span>
    </div>
  )
}
export default DaysGeneralStats;
