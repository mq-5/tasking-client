import React, { useState } from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal, Form } from "reactstrap";
import ColorSelect from "./ColorDotSelect";


const colors = ['#51cbce', '#2ba9cd', '#ff8f5e', '#fbc658', '#f5593d', '#f33816', '#c8c8c8']
function EditLabel(props) {
    let current = props.label
    const [toggleModal, setToggleModal] = useState(false);
    const [name, setName] = useState(current.name)
    const [color, setColor] = useState(current.color)

    React.useEffect(() => {
        setName(current.name)
        setColor(current.color)
    }, [current])

    const editLabel = async (e) => {
        e.preventDefault()
        if (colors.includes(color)) {
            let label = { name, color }
            const resp = await fetch(`${props.URL}labels/${current.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                },
                body: JSON.stringify(label)
            })
            const data = await resp.json()
            console.log('LABELL EDIT', data)
            if (data.status.ok) {
                setToggleModal(false)
                props.fetch()
            } else {
                alert('Error!')
            }
        } else {
            alert('Color not valid! ' + color)
        }
    }
    const deleteLabel = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${props.URL}labels/${current.id}`, {
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
                        Edit Label
                    </h6>
                </div>
                <div className="modal-body">
                    <Form onSubmit={e => editLabel(e)}>
                        <FormGroup>
                            <label>Name</label>
                            <Input placeholder="Name" type="text"
                                onChange={e => setName(e.target.value)}
                                defaultValue={name}
                                maxLength={64} required />
                        </FormGroup>
                        <FormGroup>
                            <label>Color</label>
                            <ColorSelect
                                options={colors.map(c => { return { color: c, label: c, value: c } })}
                                defaultValue={color}
                                onChange={e => { setColor(e.value); console.log(color) }} />
                        </FormGroup>
                        <div className='d-flex justify-content-between'>
                            <Button className="btn-round" color="default" type="button" onClick={e => deleteLabel(e)}>
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

export default EditLabel;