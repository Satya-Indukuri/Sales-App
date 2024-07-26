import React, { useState } from 'react'
import '../pages/Login.css'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from "sweetalert2";


export const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const requestData = { firstName, lastName, email, password }
        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((result => {
                if (result.status === 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFirstName("");
                setLastName("");
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
            <h3 className='text-center m-3'>REGISTRATION FORM</h3>
            {loading ? <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div> : ""}
            <form onSubmit={(e) => signup(e)} className='shadow border-left-1 border-right-1 border-bottom-1 p-4 rounded'>

                <div className="form-group mb-3">
                    <label className='text-muted'>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <label className='text-muted'>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label className='text-muted'>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <label className='text-muted'>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary submit-button-login">Submit</button>
            </form>
        </div>
    )
}
