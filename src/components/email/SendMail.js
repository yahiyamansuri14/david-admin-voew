import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shippingMail } from "../../feature/product/productThunk";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SendMail() {
  const mySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const [mail_state, setMailState] = useState({
    to: '',
    shipping_number: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const checkError = () => {
    let errors = {}
    let mail_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    if (mail_state.to === '' || mail_regex.test(mail_state.to)) {
      errors.toError =  "Please Enter a valid email"
    
    }

    if (mail_state.shipping_number === '') {
      errors.shippingNumberError = "Shipping Number Can't be Null"
    }

    return errors;

  }

  // useEffect(() => {
  //   if(Object.keys(errors).length === 0 && isSubmitting) {
  //     submitForm();
  //   }
  // }, [errors])


  const handleSubmit = async (e) => {
    e.preventDefault()
    // setErrors(checkError())
    

    Swal.fire({
      title: 'Do you want to send email',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No, Don't Send`
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("mail-form").reset()
        dispatch(shippingMail(mail_state))
        Swal.fire('Email Sent Successfully', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Email send Cancel', '', 'info')
      }
    })
  }

  const submitForm = () => {
    Swal.fire({
      title: 'Do you want to send email',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No, Don't Send`
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("mail-form").reset()
        dispatch(shippingMail(mail_state))
        Swal.fire('Email Sent Successfully', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Email send Cancel', '', 'info')
      }
    })
  }

  return (
    <>
      <div className="send-mail-container">
        <div className="send-mail-card card">
          <div className="card-body">
            <h3 className="card-title">Shipping Email</h3>
            <div className="card-body">
              <form id="mail-form" novalidate onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <label className="form-label font-size-16">
                    Enter Email Address (Only One)
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required
                    onChange={(e) => setMailState({ ...mail_state, to: e.target.value })} />
                  {errors && errors.toError ? <span style={{ 'color': 'red', 'display': 'block', 'text-align': 'center' }}>{errors.toError}</span> : <span></span>}
                </div>
                <div className="form-group row mb-4">
                  <label className="form-label font-size-16">
                    Enter Tracking Number
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="#Tracking Number"
                    onChange={(e) => setMailState({ ...mail_state, shipping_number: e.target.value })}
                    required
                  ></textarea>
                  {errors && errors.shippingNumberError ? <span style={{ 'color': 'red', 'display': 'block', 'text-align': 'center' }}>{errors.shippingNumberError}</span> : <span></span>}
                </div>
                <div className="form-group row">
                  <button className="btn btn-primary btn-block w-100" type="submit">
                    Send Email
                  </button>
                </div>
                {/* onClick={handleSubmit} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
