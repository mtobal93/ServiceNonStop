import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCompanies, searchBarCompanies } from "../../redux/search";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton'
// import ForBusinessButton from "./ForBusinessButton";
import { useNavigate } from "react-router-dom";


function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const user = useSelector((store) => store.session.user);
  const companies = Object.values(useSelector((state) => state.companies))

  const locations_list = []

  companies.map(company => {
    let city = company.city
    let state = company.state
    if (city && state) {
      let cityState = city.concat(', ', state)
      locations_list.push(cityState)
    }
    return locations_list
  })

  const uniqueLocations = locations_list.filter((value, index, arr) => index === arr.indexOf(value)).sort()


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCompanies())
    dispatch(searchBarCompanies(searchQuery, location))

      .then(() => {
        navigate('/search/')
        setSearchQuery('')
      })
      .then(() => setLocation(''))

  };

  return (
    <div className="nav">
      {/* <NavLink to="/"><img className="logo" src='../../images/the_paw_in_black.png' /></NavLink> */}
      <div className="searchForm">
        <form className="formNav" onSubmit={handleSubmit}>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            id="location"
            list="locations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
          />
          <datalist id="locations">
            {uniqueLocations.map(op => (
              <option key={op} value={op}>{op}</option>
            ))
            }
          </datalist>
          <button id="search" type="submit"><i className="fa-solid fa-magnifying-glass" style={{ color: "#5f5ba8", fontSize: "large" }} /></button>
        </form>
      </div>
      {/* <div className="forBiz">
        <ForBusinessButton />
      </div> */}
    
      <div className="rightNav">
        {user ? (
          <>
            <div>
              <ProfileButton />
            </div>
          </>
        ) : (
          <>
            <div className="rightNav">
              <div>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
                &nbsp;&nbsp;&nbsp;
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          </>
        )
        }
      </div>
    </div >
  )
}

export default Navigation;
