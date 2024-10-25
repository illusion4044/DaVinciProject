// import WaterRatioPanel from '../WaterRatioPanel/WaterRatioPanel.jsx';
// import TodayListModal from '../TodayListModal/TodayListModal.jsx';

import { useSelector } from 'react-redux';

import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';

// import { selectWater } from "../../redux/waterPortion/selectors.js";

// import waterPortion from "../UserLogOutModal/UserLogoutModal.jsx";
import css from './TodayWaterList.module.css';

export default function TodayWaterList() {
  const mlLiters = useSelector(state => state.water.dailyPortions);


  const dispatch = useDispatch();


  return (
    <>

      <div className={css.container}>
        <h4 className={css.name}>Today</h4>
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
      </div>

      <h3>Today</h3>
      <ul className={css.wtList}>
        {mlLiters.map(portion => (
          <li className={css.list} key={portion.id}></li>
        ))}
      </ul>
      {/* <button onClick={() => {}}> + Add Water</button> */}

    </>
  );
}
/* <use href="src/img/icons.svg#icon-Group-4"></use>;
<use href="src/img/icons.svg#icon-pencil-square"></use>;
<use href="src/img/icons.svg#icon-trash"></use>; */

/* TodayWaterList:{portionWater}
          TodayWaterList: {} */
