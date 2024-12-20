import { useSelector, useDispatch } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import { useState } from 'react';
import css from './DailyNorma.module.css';
// import { selectUserInfo } from '../../redux/users/selectors.js';
import {selectDailyNorma} from '../../redux/water/selectors.js'

export default function DailyNorma() {
  const dailyNorm = useSelector(selectDailyNorma);

  // const { dailyNorm } = mlLiters;
  console.log(dailyNorm)
  const liters = typeof dailyNorm === "object"? dailyNorm.dailyNorm / 1000: dailyNorm / 1000;

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDailyModal = () => {
    setIsModalOpen(true);
  };

  const closeDailyModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.containerName}>
        <p className={css.title}>My daily Norma</p>
      </div>
      <div className={css.containerLiters}>
        <p className={css.nameLiters}> {liters} L</p>
        <p className={css.btn} onClick={() => dispatch(openDailyModal())}>
          Edit
        </p>
        {isModalOpen && <DailyNormaModal onClose={closeDailyModal} />}
      </div>
    </div>
  );
}
