// import TodayListModal from '../TodayListModal/TodayListModal';
import { useDispatch, useSelector } from 'react-redux';
import { openAddModal, closeAddModal } from '../../redux/water/slice.js';
import icon from '../../img/icons.svg';
import css from './AddWaterBtn.module.css'; 
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

export default function AddWaterBtn({className}) {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.water.isTodayModalOpen);

  return (
    <>
      <button className={`${className}`} type="button" onClick={() => dispatch(openAddModal())}>
        <svg className={css.icon}>
          <use href={`${icon}#icon-plus-circle`} />
        </svg>
        Add Water
      </button>
      {isModalOpen && <AddWaterModal onClose={() => dispatch(closeAddModal())}/>}  
    </>
    )
}