import css from "./UserLogoutModal.module.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function UserLogoutModal({ open, handleClose, handleLogout }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={css.modalBox}>
        <h2 className={css.modalTitle}>Log out</h2>
        <p>Do you really want to leave?</p>
        <div className={css.buttonContainer}>
          <button className={css.deleteBtn} onClick={handleLogout} color="primary">
            Log out
          </button>
          <button className={css.backBtn} onClick={handleClose} color="secondary">
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}