import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../feature/auth/authThunk";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Header(props) {

  const mySwal = withReactContent(Swal)
  const { onSidebarToggle } = props;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to Log Out',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout())
        navigate("/")
        // Swal.fire('Success', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Operation Canceled', '', 'info')
      }
    })

  }

  return (
    <header className="page-topbar">
      <div className="navbar-header">
        <div className="d-flex w-100">
          <div className="navbar-brand">
            <div className="navbar-brand-box">
              <span className="logo logo-dark">
                {/* <span className='logo-sm'>David</span>
                        <span className='logo-lg'>David</span> */}
              </span>
              <span className="logo logo-light">
                <Link to="/" className="text-decoration-none">
                  <span className="logo-lg logo-text-style font-size-20">
                    <i className="fa-solid fa-briefcase d-inline-block mx-2"></i>
                    DNT Silver
                  </span>
                </Link>
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16"
            onClick={onSidebarToggle}
          >
            <span className="">
              <i className="fa-solid fa-bars"></i>
            </span>
          </button>
          <div className="navbar-body d-flex  flex-grow-1 justify-content-end">
            <button type="button" className="btn btn-sm px-3 font-size-16" onClick={handleLogout}>
              <span className="">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
