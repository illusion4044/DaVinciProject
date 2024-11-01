// import onSaveClick from '../TodayListModal/TodayListModal.jsx';
// import onSaveClickAddModal from '../AddWaterModal/AddWaterModal.jsx';
// import { useSelector, useDispatch } from 'react-redux';
// import css from './TodayWaterList.module.css';
// import {
//   openTodayModal,
//   closeTodayModal,
//   openAddModal,
//   closeAddModal,
//   openDeleteModal,
//   closeDeleteModal,
// } from '../../redux/water/slice.js';

// import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
// import { selectDailyPortions } from '../../redux/water/selectors.js';
// import TodayListModal from '../TodayListModal/TodayListModal.jsx';
// import DeleteEntryModal from '../DeleteEntryModal/DeleteEntryModal.jsx';
// import { useEffect } from 'react';
// import { fetchDailyPortionsThunk } from '../../redux/water/operations';

// export default function TodayWaterList() {
//   const dispatch = useDispatch();
//   const isEditModalOpen = useSelector(state => state.water.isTodayModalOpen);
//   const isAddModalOpen = useSelector(state => state.water.isAddModalOpen);
//   const isDeleteModalOpen = useSelector(state => state.water.isDeleteModalOpen);

//   const dailyPortions = useSelector(selectDailyPortions);

//   useEffect(() => {
//     dispatch(fetchDailyPortionsThunk(new Date()));
//   }, [dispatch]);

//   return (
//     <>
//       <div className={css.containerMain}>
//         <p className={css.name}>Today</p>

//         <>
//           <div className={css.container}>
//             <div className={css.scrollContainer}>
//               <ul className={css.containerList}>
//                 {dailyPortions.map(portion => (
//                   <li className={css.list} key={portion._id}>
//                     <svg className={css.iconGlass}>
//                       <use href="src/img/icons.svg#icon-Group-4"></use>
//                     </svg>
//                     <p className={css.amount}> {portion.volume} ml</p>
//                     <p className={css.time}>{portion.date?.split('T')[1]}</p>

//                     <div className={css.icons}>
//                       <svg
//                         className={css.iconPencil}
//                         onClick={() => dispatch(openTodayModal())}
//                       >
//                         {isEditModalOpen && (
//                           <TodayListModal
//                             onClose={() => dispatch(closeTodayModal())}
//                           />
//                         )}
//                         <use href="/public/icons.svg#icon-Vector"></use>
//                       </svg>
//                       <svg
//                         className={css.iconTrash}
//                         onClick={() => dispatch(openDeleteModal())}
//                       >
//                         {isDeleteModalOpen && (
//                           <DeleteEntryModal
//                             onClose={() => dispatch(closeDeleteModal())}
//                           />
//                         )}
//                         <use href="src/img/icons.svg#icon-Vector"></use>
//                       </svg>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </>

//         <>
//           <div className={css.containerBtn}>
//             <p className={css.btn} onClick={() => dispatch(openAddModal())}>
//               <svg className={css.iconBtn}>
//                 <use href="src/img/icons.svg#icon-outline"></use>
//               </svg>
//               Add Water
//             </p>
//             {isAddModalOpen && (
//               <AddWaterModal onClose={() => dispatch(closeAddModal())} />
//             )}
//           </div>
//         </>
//       </div>
//     </>
//   );
// }
//2.
// import { useSelector, useDispatch } from 'react-redux';
// import css from './TodayWaterList.module.css';
// import {
//   openTodayModal,
//   closeTodayModal,
//   openAddModal,
//   closeAddModal,
// } from '../../redux/water/slice.js';

// import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
// import { selectDailyPortions } from '../../redux/water/selectors.js';
// import TodayListModal from '../TodayListModal/TodayListModal.jsx';
// import DeleteEntryModal from '../DeleteEntryModal/DeleteEntryModal.jsx';
// import { fetchDailyPortionsThunk } from '../../redux/water/operations';
// import { useEffect, useState } from 'react';
// import sprite from '../../img/icons.svg';

// export default function TodayWaterList() {
//   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
//   const [selectedPortion, setSelectedPortion] = useState(null); // added petro 01.11.24
//   // const openDeleteModal = () => setIsOpenDeleteModal(true);
//   const openDeleteModal = portion => {
//     setSelectedPortion(portion);
//     setIsOpenDeleteModal(true);
//   };
//   const closeDeleteModal = () => setIsOpenDeleteModal(false);
//   const dispatch = useDispatch();
//   const isEditModalOpen = useSelector(state => state.water.isTodayModalOpen);
//   const isAddModalOpen = useSelector(state => state.water.isAddModalOpen);
//   // const isDeleteModalOpen = useSelector(state => state.water.isDeleteModalOpen);

//   const dailyPortions = useSelector(selectDailyPortions);
//   useEffect(() => {
//     dispatch(fetchDailyPortionsThunk(new Date()));
//   }, [dispatch]);

//   return (
//     <>
//       <div className={css.containerMain}>
//         <p className={css.name}>Today</p>

//         <div className={css.container}>
//           <div className={css.scrollContainer}>
//             <ul className={css.containerList}>
//               {/* edeted below - petro 01.11.24*/}
//               {/* {dailyPortions.map(portion => ( */}
//               {[...dailyPortions].reverse().map(portion => (
//                 <li className={css.list} key={portion._id}>
//                   <div className={css.entries}>
//                     <svg className={css.iconGlass}>
//                       <use href={`${sprite}#icon-Group-4`}></use>
//                     </svg>
//                     <p className={css.amount}> {portion.volume} ml</p>
//                     <p className={css.time}>{portion.date?.split('T')[1]}</p>
//                   </div>

//                   <div className={css.icons}>
//                     <svg
//                       className={css.iconPencil}
//                       onClick={() => dispatch(openTodayModal())} // Open the edit modal
//                     >
//                       <use href={`${sprite}#icon-pencil-square`}></use>
//                     </svg>

//                     <svg
//                       className={css.iconTrash}
//                       onClick={openDeleteModal} // Open the delete modal
//                     >
//                       <use href={`${sprite}#icon-trash`}></use>
//                     </svg>
//                   </div>
//                   {/* Conditionally Render the TodayListModal and DeleteEntryModal at the root level */}
//                   {isEditModalOpen && (
//                     <TodayListModal
//                       onClose={() => dispatch(closeTodayModal())}
//                       portion={portion}
//                     />
//                   )}
//                   {isOpenDeleteModal && (
//                     <DeleteEntryModal
//                       id={portion._id}
//                       onClose={closeDeleteModal}
//                     />
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Add Water Button and Modal */}
//         <div className={css.containerBtn}>
//           <p className={css.btn} onClick={() => dispatch(openAddModal())}>
//             <svg className={css.iconBtn}>
//               <use href={`${sprite}#icon-outline`}></use>
//             </svg>
//             Add Water
//           </p>
//           {isAddModalOpen && (
//             <AddWaterModal onClose={() => dispatch(closeAddModal())} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
// 3.
import { useSelector, useDispatch } from 'react-redux';
import css from './TodayWaterList.module.css';
import {
  openTodayModal,
  closeTodayModal,
  openAddModal,
  closeAddModal,
} from '../../redux/water/slice.js';

import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
import { selectDailyPortions } from '../../redux/water/selectors.js';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import DeleteEntryModal from '../DeleteEntryModal/DeleteEntryModal.jsx';
import { fetchDailyPortionsThunk } from '../../redux/water/operations';
import { useEffect, useState } from 'react';
import sprite from '../../img/icons.svg';

export default function TodayWaterList() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedPortion, setSelectedPortion] = useState(null); // Tracks selected portion for edit/delete
  const dispatch = useDispatch();
  const isEditModalOpen = useSelector(state => state.water.isTodayModalOpen);
  const isAddModalOpen = useSelector(state => state.water.isAddModalOpen);

  const dailyPortions = useSelector(selectDailyPortions);

  useEffect(() => {
    dispatch(fetchDailyPortionsThunk(new Date()));
  }, [dispatch]);

  const openEditModal = portion => {
    setSelectedPortion(portion); // Set the specific portion to edit
    dispatch(openTodayModal());
  };

  const openDeleteModal = portion => {
    setSelectedPortion(portion); // Set the specific portion to delete
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setSelectedPortion(null); // Clear selected portion after closing delete modal
  };

  const closeEditModal = () => {
    dispatch(closeTodayModal());
    setSelectedPortion(null); // Clear selected portion after closing edit modal
  };

  return (
    <>
      <div className={css.containerMain}>
        <p className={css.name}>Today</p>

        <div className={css.container}>
          <div className={css.scrollContainer}>
            <ul className={css.containerList}>
              {[...dailyPortions].reverse().map(portion => (
                <li className={css.list} key={portion._id}>
                  <div className={css.entries}>
                    <svg className={css.iconGlass}>
                      <use href={`${sprite}#icon-Group-4`}></use>
                    </svg>
                    <p className={css.amount}> {portion.volume} ml</p>
                    <p className={css.time}>{portion.date?.split('T')[1]}</p>
                  </div>

                  <div className={css.icons}>
                    <svg
                      className={css.iconPencil}
                      onClick={() => openEditModal(portion)} // Pass the specific portion to edit
                    >
                      <use href={`${sprite}#icon-pencil-square`}></use>
                    </svg>

                    <svg
                      className={css.iconTrash}
                      onClick={() => openDeleteModal(portion)} // Pass the specific portion to delete
                    >
                      <use href={`${sprite}#icon-trash`}></use>
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conditionally Render the Modals at the root level with selectedPortion */}
        {isEditModalOpen && selectedPortion && (
          <TodayListModal
            onClose={closeEditModal}
            portion={selectedPortion} // Pass the selected portion for editing
          />
        )}
        {isOpenDeleteModal && selectedPortion && (
          <DeleteEntryModal
            id={selectedPortion._id} // Pass the selected portion for deletion
            onClose={closeDeleteModal}
          />
        )}

        {/* Add Water Button and Modal */}
        <div className={css.containerBtn}>
          <p className={css.btn} onClick={() => dispatch(openAddModal())}>
            <svg className={css.iconBtn}>
              <use href={`${sprite}#icon-outline`}></use>
            </svg>
            Add Water
          </p>
          {isAddModalOpen && (
            <AddWaterModal onClose={() => dispatch(closeAddModal())} />
          )}
        </div>
      </div>
    </>
  );
}
