import TodayListModal from '../TodayListModal/TodayListModal.jsx';

export default function TodayWaterList() {
  return (
    <>
      <h3>Today</h3>
      <ul>
        <li>
          <svg class="" width="" height="">
            <use href="./img/symbol-defs.svg#icon-phone"></use>
          </svg>
          TodayWaterList:{} <time datetime=""></time> <button></button>
          <button></button>
        </li>
        <li></li>
        <li></li>
      </ul>
      <button onClick={TodayListModal}>+ Add Water</button>
    </>
  );
}
