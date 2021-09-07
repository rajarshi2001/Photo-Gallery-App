import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { logoutsuccess } from "../redux/actions/auth";
const Header = () => {
    const options = useSelector((state) => {
        return state.auth
    })
    const { isAuthenticated, token } = options
    const dispatch = useDispatch()
    const logout = () =>{
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          }
          if(token){
              config.headers['Authorization'] = `Token ${token}`
          }
          axios.post('https://reactdjangogallery.herokuapp.com/api/auth/logout/', null, config).then(res => dispatch(logoutsuccess())).catch(
              err => console.log(err)
          )
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    {
                        !isAuthenticated ?   <Link className="navbar-brand text-white" to="/">Photo Gallery App</Link>:
                        <Link className="navbar-brand text-white" to="/dashboard">Photo Gallery App</Link>
                    }
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {
                                !isAuthenticated ? <>
                                    <li className="nav-item ">
                                        <Link className="nav-link active text-white" aria-current="page" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Link className="nav-link active text-white" aria-current="page" to="/">Login</Link>
                                    </li>
                                </> : <>

                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link text-white" onClick={logout}>Log Out</a>
                                    </li>
                                </>
                            }


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};
export default Header