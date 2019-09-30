import React, { useState } from "react";
import NavBar from '../components/Navbar'
// reactstrap components
import {
    Button, Card, Form, Input,
    Container, Row, Col,
    UncontrolledAlert
} from "reactstrap";


function Forget(props) {
    const [email, setEmail] = useState()
    const [done, setDone] = useState(false)
    console.log(props)
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("register-page");
        return function cleanup() {
            document.body.classList.remove("register-page");
        };
    });

    const forgotPassword = async () => {
        const info = { email }
        console.log('email', email)
        const resp = await fetch(`${props.URL}users/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await resp.json()
        console.log(data.status.message)
        if (data.status.ok) {
            setDone(true)
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
                        <UncontrolledAlert color="primary" className="text-dark"
                            style={{ visibility: done ? 'visible' : 'hidden' }}>
                            A link was sent to your email
                        </UncontrolledAlert>
                        <Row>
                            <Col className="ml-auto mr-auto" lg="4">
                                <Card className="card-register ml-auto mr-auto">
                                    <h3 className="title mx-auto">Reset Password</h3>
                                    <Form className="register-form" onSubmit={e => {
                                        e.preventDefault()
                                        forgotPassword()
                                    }}>
                                        <label>Email</label>
                                        <Input placeholder="Email" type="email" required maxLength={64} onChange={e => setEmail(e.target.value)} />
                                        <Button block className="btn-round" color="danger" type="submit">
                                            Reset Password
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