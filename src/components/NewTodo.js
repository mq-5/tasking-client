import React, { useState } from "react";
// reactstrap components
import {
	Button, FormGroup, Input, Modal, Form
} from "reactstrap";
import Datetime from 'react-datetime';
import moment from "moment";


import Priority from './PrioritySelect'
import Label from './LabelSelect'
import Project from './ProjectSelect'


function NewTodo(props) {
	let { default_project } = { ...props }
	// console.log('SETTODOO1111', props)
	const [modalToggle, setModalToggle] = useState(false);
	const [content, setContent] = useState()
	const [dueTime, setDueTime] = useState(null)
	const [projectId, setProjectId] = useState(default_project.id)
	const [labelList, setLabels] = useState([])
	const [priority, setPriorityId] = useState()

	const postTodo = async () => {
		// console.log('SETTODOOOOO', priority)
		if (dueTime > moment()) {
			let todo = {
				content,
				due_time: dueTime.toISOString(),
				project_id: projectId,
				labelList,
				priority
			}
			const resp = await fetch(`${props.URL}todos/new`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Token ${props.token}`
				},
				body: JSON.stringify(todo)
			})
			const data = await resp.json()
			console.log(data, moment(data.time).toLocaleString(), moment(data.time))
			if (data.status.ok) {
				setModalToggle(false)
				props.fetch()
			}
		} else {
			alert('Due date invalid')
		}
	}

	return (
		<>
			<Button
				className={props.className} color={props.color}
				type="button"
				onClick={() => setModalToggle(true)}
			>
				<i className="nc-icon nc-simple-add" />
			</Button>
			<Modal
				isOpen={modalToggle} className='modal-lg'
				toggle={() => setModalToggle(false)}
				modalClassName="modal-register"
			>
				<div className="pt-4 px-4 no-border-header text-center">
					<button
						aria-label="Close"
						className="close"
						data-dismiss="modal"
						type="button"
						onClick={() => setModalToggle(false)}
					>
						<span aria-hidden={true}>×</span>
					</button>
					<h6 className="text-muted">add task</h6>
				</div>
				<div className="modal-body">
					<Form onSubmit={(e) => {
						e.preventDefault();
						postTodo()
					}}>
						<div className="form-row">
							<FormGroup className="col-md-9">
								<label>Content</label>
								<Input type="text" placeholder="Your task..."
									maxLength={256} required={true}
									onChange={e => setContent(e.target.value)} />
							</FormGroup>
							<FormGroup className="col-md-3">
								<label>Due Date</label>
								<Datetime
									inputProps={{ placeholder: "Deadline", style: { width: '10rem' } }}
									onChange={(e) => { if (e._d) setDueTime(e._d) }}
									closeOnSelect={true}
								/>
							</FormGroup>
						</div>
						<div className='form-row'>
							<Priority {...props} setPriorityId={setPriorityId} />
							<Label {...props} setLabels={setLabels} labelList={labelList} />
							<Project {...props} setProjectId={setProjectId} />
							<Button color="danger" type='submit' className='ml-auto mr-3'>
								Submit
							</Button>
						</div>
					</Form>
				</div>
			</Modal>

		</>
	);
}

export default NewTodo;
