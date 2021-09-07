import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from "./comments/PrivateRoute";
import Gallerys from "./Components/Gallerys";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { loaduser } from "./redux/actions/auth";
import Error from "./Components/Error";

const App = () => {
  const getuser = useSelector((state) => {
    return state.auth
  })
  const { token } = getuser
  const dispatch = useDispatch()
  const fetchuser = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
    axios.get('http://127.0.0.1:8000/api/auth/user', config).then(res => dispatch(loaduser(res.data))).catch(
      err => console.log(err)
    )
  }
  useEffect(() => {
    fetchuser()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Gallerys} />
          <Route component={Error}></Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}
export default App;
