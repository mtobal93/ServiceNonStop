import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { deleteImageThunk } from "../../redux/images";
import { getImagesByCompanyIdThunk } from "../../redux/images";
import { loadACompanyThunk } from "../../redux/companies";
import { getUserImagesThunk } from "../../redux/users";




function DeleteImageModal({ imageId, onlyImage, companyId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user)

    const handleDelete = (e) => {
        e.preventDefault();


        const runDispatches = async () => {
            await dispatch(deleteImageThunk(imageId)).then(() => dispatch(getUserImagesThunk(user.id))).then(() => dispatch(getImagesByCompanyIdThunk(companyId))).then(() => dispatch(loadACompanyThunk(companyId)).then(closeModal)
            );

        };
        runDispatches();

    }



    return (
        <>
            {user && !onlyImage ? (<div className="deleteModal">
                <h1>Confirm Delete</h1>
                <span>Are you sure you want to delete this photo?</span>
                <button style={{ marginTop: "10px" }} onClick={handleDelete}>Yes, I&apos;m Sure (Delete Permanently)</button>
                <button style={{ backgroundColor: "#c3cddf", color: "#768c9f", marginTop: "10px" }} onClick={closeModal}>No! (Keep My Photo)</button>
            </div>)
                :
                (user && <div className="deleteModal">
                    <h1>Cannot Delete</h1>
                    <span>As the company owner, you must have at least one photo uploaded. Please add another photo before deleting.</span>
                </div>)
            }
            {
                !user &&
                <div className="deleteModal">
                    <h1>Cannot Delete</h1>
                    <span>You must be logged in to delete a photo.</span>
                </div>
            }
        </>)
}

export default DeleteImageModal
