import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({component: Component, auth, ...rest}) =>{
    const authuser = useSelector((state) => {
        return state.auth
    })
    const {isAuthenticated, token} = authuser
    return(
        <>
             <Route {...rest} render={(props) => (
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            )

            } />
        </>
    )
}
export default PrivateRoute