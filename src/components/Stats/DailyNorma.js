import { useSelector, useDispatch } from 'react-redux';

export default function DailyNorma() {
  const dispatch = useDispatch();
  const liters = useSelector(state => state);
  const handleEdit = () => {
    // dispatch({
    //   type: 'litters/daynorma',
    //   payload: 2,
    // });
  };

  return (
    <div>
      <h4>My daily Norma</h4>
      <p>DailyNorma: {liters} L</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
