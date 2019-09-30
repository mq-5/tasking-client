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
import { Button, Card, Form, Input, Container, Row, Col, Alert } from "reactstrap";

const fbOauth = URL => {
  window.location.replace(`${URL}login/facebook`)
}

function FormErrors(props) {
  const [visible, setVisible] = useState(true)
  const onDismiss = () => {
    setVisible(false)
  }
  return (<>
    {props.errors.map(error => {
      return (
        <Alert color="danger" isOpen={visible} toggle={onDismiss} style={{ zIndex: 10 }}>
          {error.message}
        </Alert>
      )
    })}
  </>)
}

function RegisterPage(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [formErrors, setFormErrors] = useState([])

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });


  const createAccount = async (name, email, password, passwordConfirm, URL) => {
    if (password === passwordConfirm) {
      let info = { name, email, password }
      const resp = await fetch(`${URL}users/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      })
      const data = await resp.json()
      if (data.status.ok) {
        window.location.href = '/login'
      } else {
        alert(data.status.message)
      }
    } else {
      setFormErrors([{ message: 'Passwords not matching!' }])
    }
  }

  return (
    <>
      <NavBar token={props.token} URL={props.URL} />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <FormErrors errors={formErrors} />
          <Row>
            <Col className="ml-auto mr-auto" lg={5}>
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Sign Up</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-2"
                    color="facebook"
                    href="#pablo"
                    onClick={e => {
                      e.preventDefault()
                      fbOauth(props.URL)
                    }}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                </div>
                <Form className="register-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    createAccount(name, email, password, passwordConfirm, props.URL, props.token)
                  }}>
                  <label>Name</label>
                  <Input placeholder="Name" type="text" required maxLength={256} onChange={e => { setName(e.target.value) }} />
                  <label>Email</label>
                  <Input placeholder="Email" type="email" required onChange={e => { setEmail(e.target.value) }} />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" required onChange={e => { setPassword(e.target.value) }} />
                  <label>Re-enter Password</label>
                  <Input placeholder="Re-enter Password" type="password" required onChange={e => { setPasswordConfirm(e.target.value) }} />
                  <Button block className="btn-round" color="danger" type='submit'>
                    Register
                  </Button>
                </Form>
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

export default RegisterPage;
