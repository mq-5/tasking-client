import React, { useState } from "react";
import { Button, FormGroup, Input, Modal, Form, UncontrolledAlert } from "reactstrap";

function ShareProject(props) {
    const [toggleModal, setToggleModal] = useState(false);
    const [done, setDone] = useState(false)
    const [email, setEmail] = useState()

    const shareProject = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${props.URL}users/share-project/${props.project_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify({ email })
        });
        const json = await resp.json();
        console.log('tood', json);
        if (json.status.ok) {
            setToggleModal(false)
            setDone(true)
        } else {
            alert(`Failed: ${json.status.message}`)
        }
    }

    return (
        <>
            <UncontrolledAlert color="primary" className="text-dark"
                style={{ visibility: done ? 'visible' : 'hidden' }}>
                Invitation sent
            </UncontrolledAlert>
            <Button color="neutral" id='new-label' className='ml-auto'
                type="button" onClick={() => setToggleModal(true)}>
                Invite <i class="fa fa-user-plus" aria-hidden="true"></i>
            </Button>
            <Modal isOpen={toggleModal} toggle={() => setToggleModal(false)}>
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setToggleModal(false)}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h6 className="modal-title">
                        Share Project
                    </h6>
                </div>
                <div className="modal-body">
                    <Form onSubmit={e => shareProject(e)}>
                        <FormGroup>
                            <label>User Email</label>
                            <Input placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} maxLength={64} required />
                        </FormGroup>
                        <Button block className="btn-round" color="info" type="submit">
                            Send Invitation
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default ShareProject;