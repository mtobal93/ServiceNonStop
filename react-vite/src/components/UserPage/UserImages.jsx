import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserThunk, getUserImagesThunk } from "../../redux/users";

import "./UserImages.css"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteImageModal from "../DeleteImageModal/DeleteImageModal";


function UserPhotos() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => (
        state.session.user ? state.session.user : null
    ))

    const viewedUser = useSelector(state => (
        state.users ? state.users[userId] : null
    ))

    const viewedUserImages = useSelector(state => (
        state.users ? state.users.undefined : null
    ))

    const hasAtLeastOneImage = function () {
        if (viewedUserImages != null) {
            if (!viewedUserImages.length <= 0) {
                return true
            } else { return 'No Images' }
        } else { return null }
    }

    useEffect(() => {
        const runDispatches = async () => {
            await dispatch(getUserThunk(parseInt(userId))).then(() =>
                dispatch(getUserImagesThunk(parseInt(userId)))
            );
        };
        runDispatches();
    }, [dispatch, userId, sessionUser])


    return (
        <>
            <h2>Photos</h2>
            <div id="photos-container">
                {viewedUserImages && hasAtLeastOneImage() == 'No Images' &&
                    (<h4>This user does not have any images!</h4>)
                }
                {viewedUserImages && hasAtLeastOneImage() && (
                    viewedUserImages.map(user_image => (
                        <>
                            <span key={user_image.id} className="allPhotosWrapper">
                                <img className="images"
                                    src={user_image.image_url} onClick={() => navigate(`/companies/${user_image.company_id}`)} />
                                <div className="photoCredit">
                                    <div className="photoCreditText">
                                        <div id="biz-name">
                                            &nbsp;&nbsp;{user_image.company_name}
                                        </div>

                                        <div className="trash">
                                            {((sessionUser && sessionUser.id === viewedUser.id) && (typeof user_image.comp_images_count == "string" || user_image.comp_images_count > 1)) &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={user_image.id} businessId={user_image.company_id} />} />
                                            }
                                            {((sessionUser && sessionUser.id === viewedUser.id) && (typeof user_image.comp_images_count == "number" && user_image.comp_images_count === 1)) &&
                                                <OpenModalMenuItem
                                                    itemText={<><i className="fa-solid fa-trash-can" style={{ color: "#FFFFFF" }} />&nbsp;&nbsp;</>}
                                                    modalComponent={<DeleteImageModal imageId={user_image.id} businessId={user_image.company_id} onlyImage={true} />} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </span >
                        </>
                    )
                    )
                )
                }
            </div>
        </>
    )
}

export default UserPhotos;
