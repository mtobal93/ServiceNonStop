import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCompanies } from '../../redux/search';
import {getUserThunk} from "../../redux/users"

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);


    const handleClick = e => {
        e.preventDefault();
        const queryParams = new URLSearchParams()
        queryParams.append('category', 7)
        queryParams.append('search_query', 'hvac_r')
        const categoryFromParams = queryParams.get('category');
        const queryFromParams = queryParams.get('search_query');
        const queryString = queryParams.toString();
        const url = `/search?${queryString}`;
        dispatch(getCompanies(queryFromParams, '', `category=${categoryFromParams}`, 1, 10)).then(() => {
            navigate(url)

        })

    }

    return (
        <>
            <div className="photoHeader">
                <img src="https://columbianw.com/wp-content/uploads/2019/08/ductwork.jpg" />
                <div className="photoHeaderText">
                    { !user || user.message === "user: null" ? (
                        <>
                        <h1>Welcome to Service Non Stop</h1>

                        </>
                    ) : (
                        <h1>Hi {user.first_name},</h1>

                    )}
 
                </div>

            </div >
        </>
    )
}

export default Header