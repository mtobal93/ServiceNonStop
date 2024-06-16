import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getImagesByCompanyIdThunk } from "../../redux/images";
import "./Images.css";
import AddImageToCompany from "../AddImageToCompany/AddImageToCompany";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams, Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteImageModal from "../DeleteImageModal/DeleteImageModal";
import LoginFormModal from "../LoginFormModal";


import SingleImageModal from "../SingleImageModal/SingleImageModal";



function ImagesModal({ companyId: propCompanyId, modalLoad }) {
    const dispatch = useDispatch();
    const { companyId: paramsCompanyId } = useParams()
    const companyId = propCompanyId || paramsCompanyId

    const images = useSelector(state => state.images[companyId])
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {

        dispatch(getImagesByCompanyIdThunk(companyId))


    }, [dispatch, companyId])

    const lastInitial = (lastName) => {
        let last = lastName.charAt(0)
        return last + "."
    }

    return (images &&
        <div className={modalLoad ? "allPhotosModal modal-content" : "page"}>
            <div className="allPhotosHeader">
                <div>{modalLoad ? (
                    <h1>Photos for {images.images.company_name}</h1>
                ) : (
                    <h1>Photos for <Link to={`/companies/${companyId}`}>{images.images.company_name}</Link></h1>
                )}

                </div>
                <div>
                    {!sessionUser && modalLoad &&
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-camera" />&nbsp;&nbsp;Add photo</>}
                            modalComponent={<LoginFormModal />}
                        />
                    }
                    {sessionUser && modalLoad &&
                        <OpenModalButton
                            buttonText={<>
                                <i className="fa-solid fa-camera" />&nbsp;&nbsp;Add photo</>}
                            modalComponent={<AddImageToCompany companyId={companyId} companyName={images.images.company_name} />}
                        />
                    }
                </div>
            </div>
            <div className={modalLoad ? "allPhotosContainerModal" : "allPhotosContainerPage"}>
                {images.images.company_images &&
                    images.images.company_images.map(company_image => (
                        <>
                            <span key={company_image.id} className="allPhotosWrapper">
                                <OpenModalMenuItem
                                    itemText={<><img
                                        className="images"
                                        src={company_image.url} /></>}
                                    modalComponent={<SingleImageModal imageUrl={company_image.url} />} />
                                <div className="photoCredit">
                                    <div className="photoCreditText">
                                        <div>
                                            &nbsp;&nbsp;By {company_image.user.first_name} {company_image.user.last_name && lastInitial(company_image.user.last_name)}
                                        </div>

                                        <div className="trash">
                                            {sessionUser && sessionUser.id === company_image.uploaded_by_id && Number(images.images.company_images.length) > 1 &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF", cursor: "pointer" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={company_image.id} onlyImage={false} companyId={companyId} />} />

                                            }

                                            {sessionUser && sessionUser.id === company_image.uploaded_by_id && Number(images.images.company_images.length) === 1 &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF", cursor: "pointer" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={company_image.id} onlyImage={true} companyId={companyId} />} />

                                            }

                                        </div>

                                    </div>
                                </div>
                            </span >
                        </>
                    )
                    )}
                {images.images.review_images &&
                    images.images.review_images.map(review_image => (
                        <>
                            <span key={review_image.id} className="allPhotosWrapper">
                                <OpenModalMenuItem
                                    itemText={<><img
                                        className="images"
                                        src={review_image.url} /></>}
                                    modalComponent={<SingleImageModal imageUrl={review_image.url} />} />

                                <div className="photoCredit">
                                    <div className="photoCreditText">
                                        <div>
                                            &nbsp;&nbsp;By {review_image.user.first_name} {review_image.user.last_name && lastInitial(review_image.user.last_name)}
                                        </div>

                                        <div className="trash">
                                            {sessionUser && sessionUser.id === review_image.uploaded_by_id &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF", cursor: "pointer" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={review_image.id} onlyImage={false} companyId={companyId} />} />

                                            }

                                        </div>
                                    </div>
                                </div>
                            </span>

                        </>
                    )
                    )}
            </div>

        </div >)
}

export default ImagesModal
