import { useSelector, useDispatch } from 'react-redux';
import { changeDailyNorma } from '../../redux/water/slice.js';

export default function DailyNorma() {
  const liters = useSelector(state => state.water.dailyNorma);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(changeDailyNorma);

  return (
    <div>
      <h4>My daily Norma</h4>
      <p>DailyNorma: {liters} L</p>

      <button onClick={handleClick}>Edit</button>


      <button onClick={() => {}}>Edit</button>

      <button onClick={handleClick}>Edit</button>

    </div>
  );
}
