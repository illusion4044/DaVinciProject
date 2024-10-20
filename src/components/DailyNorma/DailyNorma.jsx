import { useSelector } from 'react-redux';
import DailyNormaModal from 'components/DailyNormaModal/DailyNormaModal.jsx';

export default function DailyNorma() {
  const liters = useSelector(state => state.auth.items);

  return (
    <div>
      <h4>My daily Norma</h4>
      <p>DailyNorma: {liters} L</p>
      <button onClick={DailyNormaModal}>Edit</button>
    </div>
  );
}
