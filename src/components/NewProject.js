import React, { useState } from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal, Form } from "reactstrap";

function NewProject(props) {
    const [toggleModal, setToggleModal] = useState(false);
    const [name, setName] = useState()
    const createProject = async (e) => {
        e.preventDefault()
        let project = { name }
        const resp = await fetch(`${props.URL}projects/new`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify(project)
        })
        const data = await resp.json()
        console.log('FDSKLFJSDLFJLF0', data)
        if (data.status.ok) {
            setToggleModal(false)
            props.fetch()
        } else {
            alert('Error!')
        }
    }
    return (
        <>
            <Button color="neutral" id='new-project' block className='mx-2'
                type="button" onClick={() => setToggleModal(true)}>
                New Project <i class="fa fa-plus" aria-hidden="true"></i>
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
                        New Project
                    </h6>
                </div>
                <div className="modal-body">
                    <Form onSubmit={e => createProject(e)}>
                        <FormGroup>
                            <label>Name</label>
                            <Input placeholder="Name" type="text" onChange={e => setName(e.target.value)} required />
                        </FormGroup>
                        <Button block className="btn-round" color="warning" type="submit">
                            Create
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default NewProject;