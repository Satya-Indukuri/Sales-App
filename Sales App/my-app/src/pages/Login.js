import React from 'react'
import '../pages/Login.css'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from "sweetalert2";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result => {
                if (result.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully logged in'
                    })
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("user", JSON.stringify(result.data.result.user));
                    dispatch({type: "LOGIN_SUCCESS", payload: result.data.result.user });
                    navigate('/');
                    setLoading(false);
                }
                setEmail("");
                setPassword("");
            }))
            .catch((err) => {
                console.log(err);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.error
                })
            })
    }

    return (
        <div className='container'>
            <h3 className='text-center m-3'>LOGIN</h3>
            {loading ? <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div> : ""}
            <form onSubmit={(e)=>login(e)} className='shadow border-left-1 border-right-1 border-bottom-1 p-4 rounded'>
                <div className="form-group mb-2">
                    <label className='text-muted'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control"/>
                </div>
                <div className="form-group mb-3">
                    <label className='text-muted'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary submit-button-login">Submit</button>
            </form>
        </div>
    )
}
