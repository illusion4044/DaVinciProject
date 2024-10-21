import TodayListModal from '../TodayListModal/TodayListModal.jsx';

export default function TodayWaterList() {
  return (
    <>
      <h3>Today</h3>
      <ul>
        <li>
          <svg>
            <use href="./img/"></use>
          </svg>
          TodayWaterList:{} <button></button>
          <button></button>
        </li>
        <li></li>
        <li></li>
      </ul>
      <button onClick={TodayListModal}>+ Add Water</button>
    </>
  );
}
