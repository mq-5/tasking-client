import React, { useState } from "react";
import NavBar from '../components/Navbar'
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";


function Forget(props) {
    const [password, setPassword] = useState()
    const [cfPassword, setCfPassword] = useState()
    const token = props.match.params.token
    console.log('NEW PW', props, token)
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("register-page");
        return function cleanup() {
            document.body.classList.remove("register-page");
        };
    });

    const resetPassword = async () => {
        if (password === cfPassword) {
            const info = { password, token }
            const resp = await fetch(`${props.URL}users/new-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            const data = await resp.json()
            console.log(data.status.message)
            if (data.status.ok) {
                window.location.href = '/login'
            }
        } else {
            alert('Password not matching')
        }
    }

    if (props.token) {
        alert('You already logged in!')
        window.location.replace(window.location.origin)
    } else {
        return (
            <>
                <NavBar token={props.token} URL={props.URL} />
                <div
                    className="page-header"
                    style={{
                        backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
                    }}
                >
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" lg="4">
                                <Card className="card-register ml-auto mr-auto">
                                    <h3 className="title mx-auto">New Password</h3>
                                    <Form className="register-form" onSubmit={e => {
                                        e.preventDefault()
                                        resetPassword()
                                    }}>
                                        <label>Password</label>
                                        <Input placeholder="Password" type="password" required
                                            onChange={e => setPassword(e.target.value)} />
                                        <label>Confirm Password</label>
                                        <Input placeholder="Re-enter Password" type="password" required
                                            onChange={e => setCfPassword(e.target.value)} />
                                        <Button block className="btn-round" color="danger" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }

}

export default Forget;