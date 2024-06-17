import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from "./ProfileButton";
import SearchBar from '../SearchBar/SearchBar'

function Navigation() {
    const user = useSelector((store) => store.session.user);

    return (
        <div className="nav">
            <NavLink to="/">
                <img
                    className="logo"
                    src="../../images/service_non_stop_1.png"
                />
            </NavLink>

            <div className="workVan">
                <img src="../images/workVan.gif" height={75} alt="workVan" />
            </div>

            <SearchBar />

            <div className="rightNav">
                {!user || user?.message === "user: null" ? (
                    <>
                        <div className="rightNavButtons">
                            <OpenModalButton
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalButton
                                buttonText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <ProfileButton />
                    </>
                )}
            </div>
        </div>
    );
}

export default Navigation;
