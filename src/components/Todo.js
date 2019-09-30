import React, { useState } from 'react';
import {
	Button, FormGroup,
	Modal, Form, Input, Badge
} from 'reactstrap';
import Datetime from 'react-datetime';
import moment from "moment";


import Priority from './PrioritySelect'
import Label from './LabelSelect'
import Project from './ProjectSelect'


function EditTodo(props) {
	let todo = props.todo
	// console.log('SETTODOO1111', todo, moment(todo.due_date))
	const [modalToggle, setModalToggle] = useState(false);
	const [content, setContent] = useState(todo.content)
	const [dueTime, setDueTime] = useState(moment(todo.due_date))
	const [projectId, setProjectId] = useState(todo.project.id)
	const [labelList, setLabels] = useState(todo.labels)
	const [priority, setPriorityId] = useState(todo.priority && todo.priority.id)

	const postTodo = async () => {
		// console.log('SETTODOOOOO', priority)
		if (dueTime > moment()) {
			let info = {
				content,
				due_time: dueTime.toISOString(),
				project_id: projectId,
				labelList,
				priority
			}
			const resp = await fetch(`${props.URL}todos/edit/${todo.id}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Token ${props.token}`
				},
				body: JSON.stringify(info)
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
				<i className="fa fa-ellipsis-h" area-hidden={true} />
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
					<h6 className="text-muted">edit task</h6>
				</div>
				<div className="modal-body">
					<Form onSubmit={(e) => {
						e.preventDefault();
						postTodo()
					}}>
						<div className="form-row">
							<FormGroup className="col-md-9">
								<label>Content</label>
								<Input type="text" defaultValue={content}
									maxLength={256} required={true}
									onChange={e => setContent(e.target.value)} />
							</FormGroup>
							<FormGroup className="col-md-3">
								<label>Due Date</label>
								<Datetime
									defaultValue={dueTime}
									inputProps={{ style: { width: '10rem' } }}
									onChange={(e) => { if (e._d) setDueTime(e._d) }}
								/>
							</FormGroup>
						</div>
						<div className='form-row'>
							<Priority {...props} setPriorityId={setPriorityId} priorities={props.data.priorities} defaultValue={priority} />
							<Label {...props} setLabels={setLabels} labelList={labelList} labels={props.data.labels} />
							<Project {...props} setProjectId={setProjectId} projects={props.data.projects} defaultValue={projectId} />
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

function TodoItem(props) {
	let todo = props.todo;
	// console.log('TODOITEM', moment(todo.due_date) > moment())
	const toggleTodo = async (id) => {
		if (!todo.completed) {
			const resp = await fetch(`${props.URL}todos/complete/${id}`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Token ${props.token}`
				}
			})
			const data = await resp.json()
			if (data.status.ok) {
				props.fetch()
				console.log('completed', data)
			} else {
				alert('Error occurs')
			}
		} else {
			const resp = await fetch(`${props.URL}todos/uncomplete/${id}`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Token ${props.token}`
				}
			})
			const data = await resp.json()
			if (data.status.ok) {
				props.fetch()
				console.log('uncompleted', data)
			} else {
				alert('Error occurs')
			}
		}
	}

	const deleteTodo = async (id) => {
		const resp = await fetch(`${props.URL}todos/delete/${id}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Token ${props.token}`
			}
		})
		const data = await resp.json()
		if (data.status.ok) {
			props.fetch()
			console.log('deleted', data)
		}
	}

	return (
		<div className={`todo-item d-flex ${todo.completed ? 'checked' : null}`} style={{ flexWrap: 'wrap' }}>
			<FormGroup check>
				<Button className='mx-2 p-0' color='neutral'
					onClick={() => toggleTodo(todo.id)}>
					<i className={`fa fa-${todo.completed ? 'check-' : ''}circle-o`}
						style={{ color: todo.completed ? 'lightgray' : 'grey', fontSize: '1.2rem' }}
						aria-hidden="true"></i>
				</Button>
				<span> {todo.content}{' '}</span>
				{todo.priority ?
					<small >
						<i style={{ color: todo.priority.color }} className="fa fa-flag mx-1" aria-hidden="true"></i>
					</small> : null}
				<span style={{
					backgroundColor: moment(todo.due_date) < moment() && !todo.completed ? '#ffc0a4' : 'transparent',
					fontSize: 10,
					color: moment(todo.due_date) < moment() && !todo.completed ? '#f5593d' : 'grey'
				}}>
					<i className="nc-icon nc-calendar-60 mx-1" />{moment(todo.due_date).format('lll')}</span><br />
				<small style={{ textDecoration: 'underline', fontStyle: 'italic', margin: '1rem', color: 'grey' }}>
					<i className="nc-icon nc-box mr-1" /> {todo.project.name}
				</small>

			</FormGroup>
			<div className='ml-auto align-items-center d-flex'>
				{todo.labels.map(label =>
					<Badge href="#" pill style={{ fontSize: 9, backgroundColor: label.color }} className='mx-1'>
						{label.name}</Badge>
				)}
				<EditTodo {...props} className="p-0 btn-link" />
				<Button className='p-0 btn-link' type='button' onClick={() => deleteTodo(todo.id)}>
					<i className="fa fa-trash-o" aria-hidden="true"></i>
				</Button><br />

			</div>
			<br />
		</div>
	)
}

export default TodoItem;

