import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const Register = () => {
    const [reg, setReg] = useState({
        username: "",
        email: "",
        password: "",
        password1: "",
    })
    const myphotos = useSelector((state) => {
        return state.auth
    })
    const { isAuthenticated } = myphotos
    const regdetails = (e) => {
        e.preventDefault()
        const { username, email, password, password1 } = reg
        console.log(username.charAt(0))
        if (password !== password1) {
            alert("Passwords should be identical")
        }
        else if (email.length < 13) {
            alert("Invalid email address")
        }
        else if (username.length > 5) {
            alert("username should have maximum 5 characters")
        }
        else if (username.charAt(0) === username.charAt(0).toUpperCase()) {
            alert("username should start with a small letter")
        }
        else {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({
                username, email, password
            })
            axios.post('http://127.0.0.1:8000/api/auth/register', body, config).then(res =>
                alert("You are registered successfully")).catch(err => console.log(err))
            setReg({
                username: "",
                email: "",
                password: "",
                password1: ""
            })
        }
    }
    return (
        <>
            {
                isAuthenticated ? <Redirect to="/dashboard" /> :
                    <>
                        <div className="container my-3">
                            <div className="row">
                                <div className="col-12 col-lg-12">
                                    <form onSubmit={regdetails} className="shadow p-3" noValidate>
                                        <h2 className="text-center alert alert-danger">Register Here</h2>
                                        <div className="form-group mb-3">
                                            <label>Username</label>
                                            <input type="text" className="form-control" placeholder="Create username" name="username" value={reg.username} onChange={(e) => {
                                                setReg(
                                                    {
                                                        ...reg,
                                                        username: e.target.value
                                                    }
                                                )
                                            }} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" className="form-control" placeholder="Enter your email" name="email" value={reg.email} onChange={(e) => {
                                                setReg(
                                                    {
                                                        ...reg,
                                                        email: e.target.value
                                                    }
                                                )
                                            }} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Enter your password" name="password" value={reg.password} onChange={(e) => {
                                                setReg({
                                                    ...reg,
                                                    password: e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Confirm Password</label>
                                            <input type="password" className="form-control" placeholder="Confirm your password" name="password1" value={reg.password1} onChange={(e) => {
                                                setReg({
                                                    ...reg,
                                                    password1: e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="text-center">
                                            <input type="submit" value="Register" className="btn btn-outline-secondary w-100 my-3" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </>
    )
};
export default Register