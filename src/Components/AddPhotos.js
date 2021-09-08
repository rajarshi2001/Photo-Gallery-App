import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addphotos } from '../redux/actions/gallery'
import AllPhotos from './AllPhotos'

const AddPhotos = ({ username }) => {
    const [pic, setPic] = useState(null)
    const allitems = useSelector((state) => {
        return state.gallery
    })
    const { photos } = allitems
    const myuser = useSelector((state) => {
        return state.auth
    })
    const { token, user } = myuser
    const dispatch = useDispatch()
    const submitfile = (e) => {
        e.preventDefault()
        const picture = pic
        if (pic === null) {
            alert("Please upload an image")
        }
        else {
            const body = new FormData()
            body.append('picture', picture)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if (token) {
                config.headers['Authorization'] = `Token ${token}`
            }
            axios.post('https://reactdjangogallery.herokuapp.com/galleryapi/', body, config).then((res) => {
                console.log(res.data)
                dispatch(addphotos(res.data))
            }).catch(
                err => console.log(err)
            )
            setPic(null)
        }
    }
    return (
        <>
            <div className="container my-3">
                <h2 className="text-center alert alert-danger"><i>Welcome to Dashboard {username} </i></h2>
                <div className="row">
                    <div className="col-12 col-lg-12">
                        <form className="shadow p-3" onSubmit={submitfile} >
                            <div className="form-group mb-3">
                                <label>Add Photo</label>
                                <input type="file" className="form-control"  onChange={(e) => { setPic(e.target.files[0]) }} />
                                <div className="text-center">
                                    <input type="submit" value="Upload Photo" className="btn btn-outline-primary my-3 w-100" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <AllPhotos />
                </div>
            </div>
        </>
    )
}
export default AddPhotos