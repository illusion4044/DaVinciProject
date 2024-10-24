import { useSelector, useDispatch } from 'react-redux';
import { openDailyModal } from '../../redux/water/slice.js';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import { useState } from 'react';

export default function DailyNorma() {
  const mlLiters = useSelector(state => state.water.dailyPortions);
  const liters = mlLiters / 1000;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDailyModal = () => {
    setIsModalOpen(true);
  };

  const closeDailyModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h4>My daily Norma</h4>
      <p>DailyNorma: {liters} L</p>
      <button onClick={() => dispatch(openDailyModal())}>Edit</button>
      {isModalOpen && <DailyNormaModal closeModal={closeDailyModal} />}
    </div>
  );
}
