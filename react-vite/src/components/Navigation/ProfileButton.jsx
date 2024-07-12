import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { HiLogout } from "react-icons/hi";

function ProfileButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    // console.log(user);
    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    return (
        <>
            {!user ||
                (user?.message === "user: null" && (
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
                ))}
            <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
                {" "}
                {user?.user_image_url ? (
                    <img className="profileAvatar" src={user.user_image_url} />
                ) : (
                    <img
                        className="profileAvatar"
                        src="../../images/defaultAvatar.png"
                    />
                )}
            </div>
            {showMenu && (
                <div className="dropdown">
                    <ul className={"profile-dropdown"} ref={ulRef}>
                        {user || user?.message !== "user: null" ? (
                            <>
                                <div
                                    className="profiledropdownoptions"
                                    onClick={() => {
                                        navigate(`/users/${user.id}`),
                                            closeMenu();
                                    }}
                                >
                                    <i className="fa-regular fa-address-card" />
                                    &nbsp;&nbsp; About Me
                                </div>

                                <div
                                    className="profiledropdownoptions"
                                    onClick={() => {
                                        navigate("/companies/new"),
                                            closeMenu();
                                    }}
                                >
                                    <i className="fa-solid fa-warehouse" />
                                    &nbsp;&nbsp; Add a Company
                                </div>

                                <div
                                    className="profiledropdownoptions"
                                    onClick={() => {
                                        navigate("/companies/current"),
                                            closeMenu();
                                    }}
                                >
                                    <i className="fa-solid fa-list-check" />
                                    &nbsp;&nbsp; Manage  &nbsp;&nbsp;&nbsp;Companies
                                </div>

                                <div
                                    className="profiledropdownoptions"
                                    onClick={logout}
                                >
                                    <HiLogout />
                                    &nbsp;&nbsp; Log Out{" "}
                                </div>
                            </>
                        ) : (
                            <>
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
