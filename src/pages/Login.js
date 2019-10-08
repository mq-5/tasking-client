/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import NavBar from '../components/Navbar'
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

const fbOauth = URL => {
  window.location.replace(`${URL}login/facebook`)
}

function Login(props) {
  // console.log(props.history)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const user_login = async URL => {
    const info = { email, password }
    const resp = await fetch(`${URL}users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const data = await resp.json()
    if (data.status.ok) {
      localStorage.setItem("token", data.token)
      let x = localStorage.getItem('from')
      if (x) {
        window.location.replace(`/invitation/${x}`)
      } else {
        window.location.replace('/main')
      }
      localStorage.removeItem('from')

    } else {
      alert(`Failure: ${data.status.message}`)
    }
  }

  if (props.authenticated) {
    alert('You already logged in!')
    window.location.replace(window.location.origin)
  } else {
    return (
      <>
        <NavBar token={props.token} URL={props.URL} />
        <div
          className="page-header"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        >
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Log In</h3>
                  <div className="social-line text-center">
                    <Button
                      className="btn-neutral btn-just-icon mr-2"
                      color="facebook"
                      onClick={e => {
                        e.preventDefault()
                        fbOauth(props.URL)
                      }}
                    >
                      <i className="fa fa-facebook-square" />
                    </Button>
                    {/* <Button
                      className="btn-neutral btn-just-icon mr-2"
                      color="google"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-google-plus" />
                    </Button> */}
                  </div>
                  <Form className="register-form" onSubmit={e => {
                    e.preventDefault()
                    user_login(props.URL)
                  }}>
                    <label>Email</label>
                    <Input placeholder="Email" type="email" required maxLength={64} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <Input placeholder="Password" type="password" required onChange={e => setPassword(e.target.value)} />
                    <Button block className="btn-round" color="danger" type="submit">
                      Log In
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      href="/forget"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="footer register-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Creative Tim
            </h6>
          </div>
        </div>
      </>
    );
  }

}

export default Login;
