import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setErrors({
                confirmPassword:
                    "Confirm Password field must be the same as the Password field",
            });
        }

        const serverResponse = await dispatch(
            thunkSignup({
                first_name,
                last_name,
                city,
                state,
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errObj = {};
        if (password.length < 6)
            errObj.password = "Password must be at least 6 characters.";
        if (password !== confirmPassword)
            errObj.confirmPassword =
                "Confirm Password field must be the same as the Password field.";
        if (!first_name) errObj.first_name = "First name is required.";
        if (first_name.trim().length < 1)
            errObj.first_name = "First name is required.";
        if (!last_name) errObj.last_name = "Last name is required.";
        if (last_name.trim().length < 1)
            errObj.last_name = "Last name is required.";
        if (!email) errObj.email = "Email is required.";
        if (email && !emailRegex.test(email))
            errObj.email = "Email format is invalid.";
        if (!city) errObj.city = "City is required.";
        if (city.trim().length < 1) errObj.city = "City is required.";
        if (!state) errObj.state = "State is required.";

        setErrors(errObj);
    }, [password, confirmPassword, first_name, last_name, email, city, state]);

    const states = [
        { val: "AL" },
        { val: "AK" },
        { val: "AZ" },
        { val: "AR" },
        { val: "CA" },
        { val: "CO" },
        { val: "CT" },
        { val: "DE" },
        { val: "DC" },
        { val: "FL" },
        { val: "GA" },
        { val: "HI" },
        { val: "ID" },
        { val: "IL" },
        { val: "IN" },
        { val: "IA" },
        { val: "KS" },
        { val: "KY" },
        { val: "LA" },
        { val: "ME" },
        { val: "MD" },
        { val: "MA" },
        { val: "MI" },
        { val: "MN" },
        { val: "MS" },
        { val: "MO" },
        { val: "MT" },
        { val: "NE" },
        { val: "NV" },
        { val: "NH" },
        { val: "NJ" },
        { val: "NM" },
        { val: "NY" },
        { val: "NC" },
        { val: "ND" },
        { val: "OH" },
        { val: "OK" },
        { val: "OR" },
        { val: "PA" },
        { val: "RI" },
        { val: "SC" },
        { val: "SD" },
        { val: "TN" },
        { val: "TX" },
        { val: "UT" },
        { val: "VT" },
        { val: "VI" },
        { val: "VA" },
        { val: "WA" },
        { val: "WV" },
        { val: "WI" },
        { val: "WY" },
    ];

    return (
        <>
            <div className="logSignMod">
                {errors.server && <p>{errors.server}</p>}

                <form className="landSModal" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        required
                    />
                    {errors.first_name && (<span className="errors">&nbsp;{errors.first_name}</span>)}

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        required
                    />
                    {errors.last_name && (<span className="errors">&nbsp;{errors.last_name}</span>)}

                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    {errors.city && (<span className="errors">&nbsp;{errors.city}</span>)}

                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    >
                        <option value="">Select State</option>
                        {states && states.map((ele, index) => (<option key={index}>{ele['val']}</option>))}
                    </select>
                    {errors.state && <span className="errors">&nbsp;{errors.state}</span>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && (<span className="errors">&nbsp;{errors.email}</span>)}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && (<span className="errors">&nbsp;{errors.password}</span>)}

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && (<span className="errors">&nbsp;{errors.confirmPassword}</span>)}
                    
                    <button type="submit" disabled={!!Object.values(errors).length}>Sign Up</button>

                    <span>
                    Already a user?&nbsp;
                    <OpenModalMenuItem
                        itemText={<span className="modalLink">Log in</span>}
                        modalComponent={<LoginFormModal />}
                    />
                </span>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
