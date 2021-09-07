import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import AddPhotos from "./AddPhotos";

const Gallerys = () => {
    const myuser = useSelector((state) => {
        return state.auth
    })
    const { isAuthenticated, user } = myuser
    return (
        <>
            {
                isAuthenticated ? <div className="container my-3">
                    <AddPhotos username={user.username} />
                </div> : <Redirect to="/" />
            }

        </>
    )
};
export default Gallerys