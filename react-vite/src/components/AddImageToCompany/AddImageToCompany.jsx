import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createCompanyImageThunk } from "../../redux/companies";
import { useModal } from "../../context/Modal";
import "./AddImage.css"
import { getImagesByCompanyIdThunk } from "../../redux/images";

function AddImageToCompany({ companyId: propCompanyId, companyName }) {
    const dispatch = useDispatch();
    const { companyId: paramsCompanyId } = useParams()
    const companyId = propCompanyId || paramsCompanyId
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors] = useState({});
    const { closeModal } = useModal();

    const sessionUser = useSelector(state => state.session.user)

    const company = useSelector(state => state.companies[companyId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("uploaded_by_id", sessionUser.id);
        formData.append("imageable_id", companyId);
        formData.append("imageable_type", "company");

        setImageLoading(true);

        await dispatch(createCompanyImageThunk(formData))
            .then(dispatch(getImagesByCompanyIdThunk(companyId)))
            .then(() => closeModal())
            .then(() => navigate(`/companies/${companyId}/images`))
            .catch((error) => {
                console.error("Error uploading image:", error);
                setImageLoading(false);
            })
    }

    return (
        <div className="addPhoto">
            <h1>{company?.name || companyName}: Add Photos</h1>
            {sessionUser &&
                <div>
                    <br />
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {errors.image && <div className="errors">&nbsp;{errors.image}</div>}
                        {(imageLoading) && <p>Loading...</p>}
                        <div>
                            <button type="submit"
                                disabled={!!Object.values(errors).length}>Upload photo</button>
                        </div>
                    </form>
                    <br />
                    <h2 style={{ textAlign: "center" }}>Please be mindful of your photos?
                    </h2>
                </div>
            }
        </div>
    )
}

export default AddImageToCompany
