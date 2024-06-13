import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCompanies } from '../../redux/search';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

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
                <img src="https://www.airco.com/wp-content/uploads/2021/09/iStock-1136830102-e1635881952200.jpg" />
                <div className="photoHeaderText">
                    <h1>We want you comfortable</h1>
                    <div>
                        <button onClick={handleClick}><i className="fa-solid fa-magnifying-glass" />&nbsp;&nbsp;&nbsp;Heating and Air</button>
                    </div>
                </div>
                <div className="photoHeaderCredit">
                    <div><Link to="/companies/4">Edison Heating & Cooling</Link></div>
                    <div style={{ fontWeight: "300" }}>Photo by June S.</div>
                </div>
            </div >
        </>
    )
}

export default Header