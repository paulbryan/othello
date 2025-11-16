import './Modal.css';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content confirm-modal-content">
        <h2>{title}</h2>
        <p className="confirm-message">{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Confirm</button>
          <button onClick={onCancel} className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
