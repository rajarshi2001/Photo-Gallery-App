import React, { useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { loginsuccess } from "../redux/actions/auth";
import { Redirect } from "react-router";
import { geterrors } from "../redux/actions/error";
const Login = () => {
    const dispatch = useDispatch()
    const [users, setUsers] = useState({
        username: "",
        password: ""
    })
    const loginuser = useSelector((state) => {
        return state.auth
    })
    const allerrors = useSelector((state) =>{
        return state.error
    })
    const {allerror} = allerrors
    const { isAuthenticated } = loginuser
    const submituser = (e) => {
        e.preventDefault()
        console.log(users)
        const { username, password } = users
        const body = JSON.stringify({
            username, password
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.post('https://reactdjangogallery.herokuapp.com/api/auth/login', body, config).then(res => dispatch(loginsuccess(res.data))).catch(err => 
        dispatch(geterrors({
            errdata: err.response.data.non_field_errors[0],
            errstatus: err.response.status
        })))
        setUsers({
            username: "",
            password: ""
        })
    }
    if(allerror.errdata !== undefined && allerror.errstatus !== undefined){
        alert(`You have provided ${allerror.errdata} and have a status ${allerror.errstatus} error`)
        allerror.errdata = undefined
        allerror.errstatus = undefined
    }
  
    return (
        <>
            {
                isAuthenticated ? <Redirect to="/dashboard" /> : <>
                    <div className="container my-3">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <form className="shadow p-3" onSubmit={submituser}>
                                    <h2 className="alert alert-primary">Login Here</h2>
                                    <div className="form-group mb-3">
                                        <label>Username</label>
                                        <input type="text" className="form-control" value={users.username} onChange={(e) => {
                                            setUsers({
                                                ...users,
                                                username: e.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" className="form-control" value={users.password} onChange={(e) => {
                                            setUsers({
                                                ...users,
                                                password: e.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="text-center">
                                        <input type="submit" className="btn btn-outline-success my-3 w-100" value="Login" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
export default Login