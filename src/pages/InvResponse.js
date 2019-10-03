import React, { useState } from "react";
import NavBar from '../components/Navbar'
import {
    Button, Card,
    CardBody, CardHeader, CardFooter
} from "reactstrap";


function Response(props) {
    const [isAccepted, setIsAccepted] = useState(null)
    const token = props.match.params.token
    // console.log(props.history)

    const respond = async () => {
        if (isAccepted) {
            const info = { token }
            console.log('email', isAccepted)
            const resp = await fetch(`${props.URL}users/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                },
                body: JSON.stringify(info)
            })
            const data = await resp.json()
            console.log(data)
            if (data.status.ok) {
                window.location.href = '/main'
            } else {
                alert(`Failed: ${data.status.message}`)
            }
        } else {
            window.location.href = '/main'
        }
    }

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("register-page");
        if (isAccepted !== null) respond();
        return function cleanup() {
            document.body.classList.remove("register-page");
        };
    }, [isAccepted]);

    return (
        <>
            <NavBar token={props.token} URL={props.URL} />
            <div
                className="page-header"
                style={{
                    backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
                }}
            >
                <Card className='text-center col-4'>
                    <CardHeader>
                        <h4>Respond to Invitation</h4></CardHeader>
                    <CardBody>
                        You are invited to join a project
                        </CardBody>
                    <CardFooter className='d-flex justify-content-around'>
                        <Button onClick={() => setIsAccepted(false)} >Decline</Button>
                        <Button onClick={() => {
                            setIsAccepted(true)
                        }} color='danger'>Accept</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}


export default Response;