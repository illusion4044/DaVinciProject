
import WaterRatioPanel from 'components/WaterRatioPanel/WaterRatioPanel.jsx'
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import { useSelector } from 'react-redux';

export default function TodayWaterList() {
  const portionWater = useSelector(state => state.water.dailyNorma);



  //   const time = useSelector(state => state.water.gender);

  return (
    <>
      <h3>Today</h3>
      <ul>
        <li>
          <svg>
            <use href="./img/img_for_todayWaterList/glasswater-1x.png,./img/img_for_todayWaterList/glasswater-2x.png"></use>
          </svg>
          TodayWaterList:{portionWater}
          TodayWaterList: {}
          <button>
            <svg>
              <use href="../img/icons.svg#icon-pencil-square"></use>
            </svg>
          </button>
          <button>
            <svg>
              <use href="../img/icons.svg#icon-trash"></use>
            </svg>
          </button>
        </li>
        <li>
          <svg>
            <use href="./img/img_for_todayWaterList/glasswater-1x.png,./img/img_for_todayWaterList/glasswater-2x.png"></use>
          </svg>
          TodayWaterList:{portionWater}
          TodayWaterList: {}
          <button>
            <svg>
              <use href="../img/icons.svg#icon-pencil-square"></use>
            </svg>
          </button>
          <button>
            <svg>
              <use href="../img/icons.svg#icon-trash"></use>
            </svg>
          </button>
        </li>
        <li>
          <svg>
            <use href="./img/img_for_todayWaterList/glasswater-1x.png,./img/img_for_todayWaterList/glasswater-2x.png"></use>
          </svg>
          TodayWaterList:{portionWater}
          TodayWaterList: {}
          <button>
            <svg>
              <use href="../img/icons.svg#icon-pencil-square"></use>
            </svg>
          </button>
          <button>
            <svg>
              <use href="../img/icons.svg#icon-trash"></use>
            </svg>
          </button>

        </li>
        <li>
          <svg>
            <use href="./img/"></use>
          </svg>
          TodayWaterList:{portionWater}
          TodayWaterList: {}
          <button>
            <svg>
              <use href="../img/icons.svg#icon-pencil-square"></use>
            </svg>
          </button>
          <button>
            <svg>
              <use href="../img/icons.svg#icon-trash"></use>
            </svg>
          </button>
        </li>
        <li>
          <svg>
            <use href="./img/"></use>
          </svg>
          TodayWaterList:{portionWater}
          TodayWaterList: {}
          <button>
            <svg>
              <use href="../img/icons.svg#icon-pencil-square"></use>
            </svg>
          </button>
          <button>
            <svg>
              <use href="../img/icons.svg#icon-trash"></use>
            </svg>
          </button>

        </li>
      </ul>
      <button onClick={WaterRatioPanel}>+ Add Water</button>
    </>
  );
}
