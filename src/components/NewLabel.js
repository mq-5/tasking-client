import React, { useState } from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal, Form } from "reactstrap";
import ColorSelect from "./ColorDotSelect";

const colors = ['#51cbce', '#2ba9cd', '#ff8f5e', '#3b5998', '#fbc658', '#f5593d', '#6bd098', '#f33816', '#c8c8c8']
function NewLabel(props) {
    const [toggleModal, setToggleModal] = useState(false);
    const [name, setName] = useState()
    const [color, setColor] = useState()

    const createLabel = async (e) => {
        e.preventDefault()
        if (colors.includes(color)) {
            setToggleModal(false)
            let label = { name, color }
            const resp = await fetch(`${props.URL}labels/new`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                },
                body: JSON.stringify(label)
            })
            const data = await resp.json()
            console.log('LABELLLLL', data)
            if (data.status.ok) {
                props.fetch()
            } else {
                alert('Error!')
            }
        } else {
            alert('Color not valid! ' + color)
        }
    }
    return (
        <>
            <Button color="neutral" block id='new-label' className='mx-2'
                type="button" onClick={() => setToggleModal(true)}>
                New Label <i class="fa fa-plus" aria-hidden="true"></i>
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
                        New Label
                    </h6>
                </div>
                <div className="modal-body">
                    <Form onSubmit={e => createLabel(e)}>
                        <FormGroup>
                            <label>Name</label>
                            <Input placeholder="Name" type="text" onChange={e => setName(e.target.value)} maxLength={64} required />
                        </FormGroup>
                        <FormGroup>
                            <label>Color</label>
                            {/* <Input placeholder="Color" type="select"
                                defaultValue={colors[0]}
                                onChange={e => setColor(e.target.value)} required
                                style={{ color: color }}
                                className='d-flex'>
                                {colors.map(c => <option style={{ color: c }} value={c}>
                                    Color {c}
                                </option>)}
                            </Input> */}
                            <ColorSelect options={colors.map(c => { return { color: c, label: c, value: c } })}
                                onChange={e => { setColor(e.value); console.log(color) }} />
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

export default NewLabel;