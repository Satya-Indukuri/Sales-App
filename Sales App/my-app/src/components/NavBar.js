import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const NavBar = () => {

    const user = useSelector(state => state.userReducer);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: "LOGIN_ERROR"});
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">SALES APP</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/' className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>ADD SALES</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/top5sales' className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>SALES</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/totalrevenue' className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>TODAY'S TOTAL REVENUE</NavLink>
                        </li>
                        {!user.user.email ? <>
                        <li className="nav-item">
                            <NavLink to='/login' className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>LOGIN</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/register' className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>REGISTER</NavLink>
                        </li>
                        </> : ""}
                        {user.user.email ?  <> <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=>logout()}>LOGOUT</a>
                        </li></> : ""}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
