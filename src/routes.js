import React, { useEffect, useState } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Main from './pages/Main'
import ForgetPassword from './components/Forget'
import NewPassword from './components/NewPassword'
import NotFound from './pages/Page404'
import InvResponse from './pages/InvResponse';

const URL = process.env.REACT_APP_BACKEND_URL

const ProtectedRoute = ({ location, path, component: Component, authenticator, ...rest }) => {
    // if (props.path === '/invitation/:token') {
    // console.log(location)
    let x = location.pathname.split('/')[2]
    localStorage.setItem('from', x)
    // } else {
    return (
        <Route {...rest} render={(props) => (
            authenticator
                ? <Component {...props} {...rest} />
                : <Redirect to='/login' />
        )} />)
    // }
}


const Routes = (props) => {
    const existingToken = localStorage.getItem('token');
    const accessToken = (window.location.search.split("=")[0] === "?api_key") ? window.location.search.split("=")[1] : null;
    if (accessToken) {
        localStorage.setItem("token", accessToken);
    }
    const state = {
        token: existingToken || accessToken
    }

    const [hasUser, setHasUser] = useState(false)
    const [loaded, setLoaded] = useState(false)

    let getUser = async () => {
        try {
            const resp = await fetch(`${URL}users/load-user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`
                }
            });
            const data = await resp.json();
            setHasUser(data.status.ok)
        } catch {
        }
        setLoaded(true)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (loaded) {
        return (
            <div>
                <Switch>
                    <Route path="/" exact render={(props) => <LandingPage {...props} token={state.token} URL={URL} />} />
                    <Route path="/register" exact render={(props) => <Register {...props} token={state.token} URL={URL} />} />
                    <Route path="/login" render={(props) => <Login {...props} token={state.token} URL={URL} />} />
                    <Route path="/forget" exact render={(props) => <ForgetPassword {...props} token={state.token} URL={URL} />} />
                    <Route path="/reset/:token" render={(props) => <NewPassword {...props} URL={URL} />} />
                    <ProtectedRoute path="/main" authenticator={hasUser} component={Main} token={state.token} URL={URL} />
                    <ProtectedRoute path="/invitation/:token" authenticator={hasUser} component={InvResponse} token={state.token} URL={URL} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    } else {
        return <h5>Loading...</h5>
    }
}

export default Routes;