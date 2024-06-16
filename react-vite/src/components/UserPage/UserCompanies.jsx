import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserThunk } from "../../redux/users";


function UserCompanies() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserThunk(parseInt(userId)))
    }, [dispatch, userId])



    return (
        <>
            <p>This is the Companies view!</p>
        </>
    )
}

export default UserCompanies;
