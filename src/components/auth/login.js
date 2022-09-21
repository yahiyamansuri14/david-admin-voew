import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../feature/auth/authSlice"
import './login.style.css'
import { checkLogin } from '../../feature/auth/authThunk'
import axios from 'axios'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
    const { error }  = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [inputs, setInputs]  = useState({
        email: '',
        password: ''
    })


    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(checkLogin(inputs))
        // if(error) {
        //     Swal.fire('Please Enter Valid Email or Password')
        // }
    }



    const handleForgetPassword = () => {
        axios({
            method: "GET",
            url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/mail/forget-password"
        }).then(data => {
            if(data.status == 200) {
                Swal.fire('Please check your email for credentails')
            }
            console.log(data)
        }).catch(error => {
            console.log("error is", error)
        })
    }


  return (
    <>
        <div className='login-parent-container'>
            {console.log("error is", error)}
            <div className='text-container'>
                <h2 className='text-center mt-4' >Login</h2>
                <span className='text-center mb-3 d-block'>Sign In to your account</span>
            </div>
            <div className='input-contaier'>
                <div className='mb-3'>
                    <input
                        type="email"
                        className='form-control login-form-input'
                        placeholder='email'
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type="password"
                        className='form-control login-form-input'
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        placeholder='password'
                        required
                    />
                </div>
                {error ? <span style={{'color': 'red', 'display': 'block', 'text-align': 'center'}}>Please Enter Valid Email or Password</span> : <span></span>}
                <div className='action-container'>
                    <button 
                        className='btn btn-primary'
                        type="submit"
                        onClick={handleSubmit}
                    >Login
                    </button>
                    <span className='text-primary cursor-pointer' onClick={() => handleForgetPassword() }>Forget Password</span>
                </div>
            </div>
        </div>
    </>
  )
}
