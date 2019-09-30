import React, { useState } from "react";
import { Button, FormGroup, Input, Modal, Form } from "reactstrap";

function EditProject(props) {
    const current = props.project;
    const [toggleModal, setToggleModal] = useState(false);
    const [name, setName] = useState(current.name)

    const createProject = async (e) => {
        e.preventDefault()
        const project = { name }
        const resp = await fetch(`${props.URL}projects/${current.id}`, {
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

    const deleteProject = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${props.URL}projects/${current.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${props.token}`
            }
        })
        const data = await resp.json()
        console.log('DELETED', data)
        if (data.status.ok) {
            props.fetch()
            setToggleModal(false)
        } else {
            alert('Error!')
        }
    }
    return (
        <>
            <Button
                className="p-0 btn-link"
                type="button"
                id='edit-project'
                onClick={() => setToggleModal(true)}
            >
                <i className="fa fa-ellipsis-h" area-hidden={true} />
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
                            <Input placeholder="Name" type="text"
                                onChange={e => setName(e.target.value)}
                                defaultValue={name}
                                maxLength={64} required />
                        </FormGroup>
                        <div className='d-flex justify-content-between'>
                            <Button className="btn-round" color="default" type="button" onClick={e => deleteProject(e)}>
                                Delete
                            </Button>
                            <Button className="btn-round" color="warning" type="submit">
                                Edit
                            </Button>

                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default EditProject;