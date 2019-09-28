import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Main from './pages/Main'
import NotFound from './pages/Page404'

const URL = process.env.REACT_APP_BACKEND_URL

const ProtectedRoute = ({ path, component: Component, authenticator, ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticator
            ? <Component {...props} {...rest} />
            : <Redirect to='/login' />
    )} />)

const Routes = (props) => {
    const existingToken = localStorage.getItem('token');
    const accessToken = (window.location.search.split("=")[0] === "?api_key") ? window.location.search.split("=")[1] : null;
    if (accessToken) {
        localStorage.setItem("token", accessToken);
    }
    const state = { token: existingToken || accessToken }

    return (
        <div>
            <Switch>
                <Route path="/" exact render={(props) => <LandingPage {...props} token={state.token} URL={URL} />} />
                <Route path="/register" exact render={(props) => <Register {...props} token={state.token} URL={URL} />} />
                <Route path="/login" exact render={(props) => <Login {...props} token={state.token} URL={URL} />} />
                <ProtectedRoute path="/main" authenticator={state.token} component={Main} token={state.token} URL={URL} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )

}



export default Routes;