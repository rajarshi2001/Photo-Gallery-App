import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { delphotos, getphotos } from '../redux/actions/gallery';

const AllPhotos = () => {
    const items = useSelector((state) => {
        return state.gallery
    })
    const users = useSelector((state)=>{
        return state.auth
    })
    const {token} = users
    const { photos } = items
    const dispatch = useDispatch()

    const delpicture = (id) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(token){
            config.headers['Authorization'] = `Token ${token}`
        }
        axios.delete(`https://reactdjangogallery.herokuapp.com/photodelapi/${id}`, config).then(res => dispatch(delphotos(id))).catch(
            err => console.log(err)
        )
    }
    const fetchphotos = ()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(token){
            config.headers['Authorization'] = `Token ${token}`
        }
        axios.get('https://reactdjangogallery.herokuapp.com/galleryapi', config).then(res => dispatch(getphotos(res.data))).catch(err => console.log(err))
    }
    useEffect(()=>{
        fetchphotos()
    }, [])
    return (
        <>
            <div className="container my-3">
                <div className="row">
                    {
                        photos.map((currEle) => {
                            return (
                                <>
                                    <div className="col-12 col-lg-4" key={currEle.id}>
                                        <div className="card shadow p-2 my-2">
                                            <img src={currEle.picture} alt="pic" className="img-fluid" />
                                            <div className="card-body">
                                                <p className="text-center text-danger">Date Uploaded: <span>{currEle.created_at}</span></p>
                                                <button className="btn btn-outline-danger w-100 my-2" onClick={()=>{delpicture(currEle.id)}}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};
export default AllPhotos