// import WaterRatioPanel from '../WaterRatioPanel/WaterRatioPanel.jsx';
// import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import { useSelector } from 'react-redux';

// import { selectWater } from "../../redux/waterPortion/selectors.js";
// import waterPortion from "../UserLogOutModal/UserLogoutModal.jsx";
// import css from "./TodayWaterList.module.css";

export default function TodayWaterList() {
  const portionWater = useSelector(state => state.water.item);

  //   const time = useSelector(state => state.time.item);
  //const contacts = useSelector(selectTime);
  return (
    <>
      <h3>Today</h3>
      <ul>
        <li>
          <svg>
            <use href="src/img/icons.svg#icon-Group-4"></use>
          </svg>
          {/* TodayWaterList:{portionWater}
          TodayWaterList: {} */}
          <button>
            <svg>
              <use href="src/img/icons.svg#icon-pencil-square"></use>
            </svg>
          </button>
          <button>
            <svg>
              <use href="src/img/icons.svg#icon-trash"></use>
            </svg>
          </button>
        </li>
      </ul>
      {/* <ul className={css.wtList}>
//       {rightFilter.map((portion) => ( */}
      {/* //         <li className={css.list} key={portion.id}>
//           <Portion data={portion} /> */}
      {/* //         </li> */}
      {/* //       ))} */}
      {/* //     </ul> */}
      <button onClick={() => {}}>+ Add Water</button>
    </>
  );
}
