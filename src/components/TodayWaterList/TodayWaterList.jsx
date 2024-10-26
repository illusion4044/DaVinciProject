import WaterRatioPanel from '../WaterRatioPanel/WaterRatioPanel.jsx';
import onSaveClick from '../TodayListModal/TodayListModal.jsx';
import { useSelector } from 'react-redux';
import css from './TodayWaterList.module.css';

export default function TodayWaterList() {
  const mlLiters = useSelector(state => state.water.dailyPortions);

  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Today</p>
        {onSaveClick && (
          <div className={css.containerList}>
            <svg className={css.iconGlass}>
              <use href="src/img/icons.svg#icon-Group-4"></use>
            </svg>

            <ul className={css.wtList}>
              {mlLiters.map(portion => (
                <li className={css.list} key={portion.id}></li>
              ))}
            </ul>
            <svg className={css.iconPencil}>
              <use href="/public/icons.svg#icon-Vector"></use>
            </svg>
            <svg className={css.iconTrash}>
              <use href="src/img/icons.svg#icon-Vector"></use>
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
