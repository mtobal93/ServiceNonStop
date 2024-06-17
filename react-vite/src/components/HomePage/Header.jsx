import { useSelector } from "react-redux";


function Header() {

    const user = useSelector(state => state.session.user);


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