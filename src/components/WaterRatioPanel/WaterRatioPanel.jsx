import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import { useSelector } from 'react-redux';

import { selectPercentPerDay } from '../../redux/water/selectors';
import { openTodayModal, closeTodayModal } from '../../redux/water/slice.js';
import css from './WaterRatioPanel.module.css';

import icon from '../../img/icons.svg';

import icon from "../../img/icons.svg";
import TodayListModal from '../TodayListModal/TodayListModal';



export default function WaterRatioPanel() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);

  const rect1 = Number(useSelector(selectPercentPerDay));
  // const rect1 = 75;
  const rect2 = 100 - rect1;

  return (
    <>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />

      <div className={css.container}>
        <div className={css.todayBarBox}>
          <p className={css.today}>Today</p>
          <div className={css.rectBox}>
            <span
              className={css.rectangle}
              style={{
                width: `${rect1}%`,
                background: '#9EBBFF',
              }}
            ></span>
            <span className={css.ellipse}></span>
            <span
              className={css.rectangle}
              style={{
                width: `${rect2}%`,
                background: '#D7E3FF',
              }}
            ></span>
            <span
              className={css.line}
              style={{ left: 0, transform: 'translateY(310%)' }}
            ></span>
            <span className={`${css.line} ${css.line50}`}></span>
            <span
              className={css.line}
              style={{ right: 0, transform: 'translateY(310%)' }}
            ></span>
            <span
              className={css.percent}
              style={{ left: 0, transform: 'translate(-40%, 230%)' }}
            >
              0%
            </span>
            <span className={`${css.percent} ${css.percentValue}`}>50%</span>
            <span
              className={css.percent}
              style={{ right: 0, transform: 'translate(40%, 230%)' }}
            >
              100%
            </span>
          </div>
        </div>

      </div>
     
      <button className={css.addWaterBtn} type="button" onClick={() => dispatch(openTodayModal())}>
        <svg className={css.icon}>
          <use href={`${icon}#icon-plus-circle`} />
        </svg>
        Add Water
      </button>
      {isModalOpen && <TodayListModal onClose={() => dispatch(closeTodayModal())}/>}  
    </div>
    
          



        <button className={css.addWaterBtn} type="button">
          <svg className={css.icon}>
            <use href={`${icon}#icon-plus-circle`} />
          </svg>
          Add Water
        </button>
      </div>
    </>
  );
}
