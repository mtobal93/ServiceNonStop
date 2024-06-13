import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DeleteCompanyModal from "./DeleteCompanyModal";
import "./ManageCompany.css"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


function ManageCompanyButton({ company }) {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  const closeMenu = () => setShowMenu(false);

  const ulClassName = "manage-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='manageMenu' onClick={toggleMenu}>
        <i className="fa-solid fa-ellipsis" />
      </button>
      {showMenu &&
        <>
          <ul className={ulClassName} ref={ulRef}>
            <div className="profiledropdownoptions">
              <Link to={`/companies/${company.id}/edit`}
                onClick={closeMenu}
              ><i className="fa-solid fa-pen-to-square" /> Update Companies</Link>
            </div>
            <div className="profiledropdownoptions">
              <OpenModalMenuItem
                itemText={<><i className="fa-solid fa-trash-can" />&nbsp; Delete Company</>}
                companyId={company.id}
                modalComponent={<DeleteCompanyModal companyId={company.id} />}
              />
            </div>
          </ul>
        </>


      }


    </>
  )

}

export default ManageCompanyButton
