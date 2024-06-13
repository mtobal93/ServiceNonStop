import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteCompanyThunk } from "../../redux/companies";

const DeleteCompanyModal = ({ companyId }) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCompanyThunk(companyId))
      .then(closeModal)
  }

  return (
    <>
      <div className="deleteModal">
        <h3>Confirm Delete</h3>
        <span>Are you sure you want to delete this Company?</span>
        <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I&apos;m Sure (Delete Permanently)</button>
        <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No! (Keep My Company)</button>
      </div>
    </>
  )
}

export default DeleteCompanyModal;
