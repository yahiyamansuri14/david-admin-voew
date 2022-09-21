import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addSubscriber } from "../../feature/product/productThunk";


export default function AddSubscriber() {

  const dispatch = useDispatch()
  const [email, setEmail] = useState()
  const mySwal = withReactContent(Swal)

  
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      email: email,
      isAdmin : false,
      isSubscriber: true,
      isActive: true,
      password: null
    }

    Swal.fire({
      title: 'Do you want to add email',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't Save`
    }).then((result) => {
      if(result.isConfirmed) {
        dispatch(addSubscriber(data))
          Swal.fire('Saved', '', 'success')    
      } else if(result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  return (
    <>
      <div className="subscriber-container">
        <div className="card">
          <div className="card-body">
            <h3 className="mx-3 card-title">Add Subscriber</h3>
            <div className="row m-0 p-0">
              <form onSubmit={handleSubmit}>
              <div className="col-md-10 col-sm-10 col-xl-10">
                {/* <label className="form-label font-size-16">Email</label> */}
                <input 
                  type="email"
                  className="form-control m-1"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="col-md-2 col-sm-2 col-xl-2">
                <button 
                  className="btn btn-primary"
                  // onClick={handleSubmit}
                >Add +</button>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
