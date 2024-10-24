import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import changeDailyPortion from '../../redux/water/slice.js';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';

export default function DailyNorma() {
  const [isDailyNormaModalOpen, setIsDailyNormaModalOpen] = useState(false);
  const liters = useSelector(state => state.water.dailyPortions);
  const dispatch = useDispatch();

  const openDailyNormaModal = () => {
    isDailyNormaModalOpen(true);
  };

  const closeDailyNormaModal = () => {
    setIsDailyNormaModalOpen(false);
  };
  const handleTarget = () => dispatch(changeDailyPortion);

  return (
    <div>
      <h4>My daily Norma</h4>
      <p>DailyNorma: {liters} L</p>

      <button onClick={openDailyNormaModal} onChange={handleTarget}>
        Edit
      </button>
      {openDailyNormaModal && (
        <DailyNormaModal closeDailyNormaModal={closeDailyNormaModal} />
      )}
    </div>
  );
}
