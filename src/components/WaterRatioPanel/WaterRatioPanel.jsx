import { useDispatch, useSelector } from 'react-redux';
import { selectPercentPerDay } from '../../redux/water/selectors';
import css from './WaterRatioPanel.module.css';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';


export default function WaterRatioPanel() { 
  const rect1 = Number(useSelector(selectPercentPerDay));
  const rect2 = 100 - rect1;

  return (
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
            <span className={css.line} style={{left: 0, transform: 'translateY(310%)'}}></span>
            <span className={`${css.line} ${css.line50}`}></span>
            <span className={css.line} style={{ right: 0, transform: 'translateY(310%)' }}></span>
            <span className={css.percent} style={{left: 0, transform: 'translate(-40%, 230%)'}}>0%</span>
            <span className={`${css.percent} ${css.percentValue}`}>50%</span>
            <span className={css.percent} style={{ right: 0, transform: 'translate(40%, 230%)' }}>100%</span>
          </div>
      </div>
      <AddWaterBtn className={css.addWaterBtn} />
      </div> 
  );
}
