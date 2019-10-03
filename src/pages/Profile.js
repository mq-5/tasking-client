import React, { useState } from "react";
import {
    Button, Input, Form
} from "reactstrap";

function Update(props) {
    const [formToggle, setFormToggle] = useState(false)
    const [email, setEmail] = useState()
    const update = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${props.URL}users/add-email`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify({ email })
        })
        const data = await resp.json()
        console.log('updated nha', data)
        alert(`Message: ${data.status.message}`)
    }

    if (formToggle) {
        return (
            <Form inline onSubmit={e => update(e)}>
                <Input placeholder='Add email' type='email' required className='small m-2'
                    onChange={e => {
                        e.preventDefault();
                        setEmail(e.target.value)
                    }} />
                <Button type='button' sm className='m-2' onClick={() => setFormToggle(false)}>Cancel</Button>
            </Form>
        )
    } else {
        return <a className='btn-link' href="" style={{ color: 'lightblue' }}
            onClick={(e) => {
                e.preventDefault()
                setFormToggle(true)
            }}>Update Email</a>
    }

}

function Response(props) {
    console.log('AND', props)
    let user = props.data.user;

    return (
        <>
            <div
            >
                <h2>Profile</h2>
                <ul style={{ listStyleType: 'none' }}>
                    <li className='mt-3'><strong>Username:{' '} </strong> {user.name}</li>
                    <li className='mt-3 d-flex align-items-baseline'>
                        <strong className='mr-2'>Email:</strong> {user.email ? user.email : <Update {...props} />}
                    </li>
                </ul>
            </div>
        </>
    );
}


export default Response;