import React, { useState } from 'react';
import {
	Button, FormGroup,
	Modal, Form, Input, Badge, UncontrolledPopover,
	PopoverHeader, PopoverBody
} from 'reactstrap';
import { Link } from 'react-router-dom'
import Datetime from 'react-datetime';
import moment from "moment";

import MultiSelect from './MultiSelect';
import Priority from './PrioritySelect';
import Label from './LabelSelect';
import Project from './ProjectSelect';


function EditTodo(props) {
	let todo = props.todo
	const [modalToggle, setModalToggle] = useState(false);
	const [content, setContent] = useState(todo.content)
	const [dueTime, setDueTime] = useState(moment(todo.due_date)._d)
	const [projectId, setProjectId] = useState(todo.project.id)
	const [labelList, setLabels] = useState(todo.labels.map(item => { return { value: item.id, label: item.name } }))
	const [priority, setPriorityId] = useState(todo.priority && todo.priority.id)

	let state = { content, dueTime, projectId, labelList, priority }
	// console.log('SETTODOO1111', state)

	const resetState = () => {
		setContent(todo.content)
		setDueTime(moment(todo.due_date)._d)
		setProjectId(todo.project.id)
		setLabels(todo.labels.map(item => { return { value: item.id, label: item.name } }))
		setPriorityId(todo.priority && todo.priority.id)
	}

	React.useEffect(() => {
		resetState()
	}, [todo])

	const postTodo = async () => {
		if (dueTime > moment()) {
			let info = {
				content,
				due_time: dueTime.toISOString(),
				project_id: projectId,
				labelList: labelList.map(item => item.value),
				priority
			}
			console.log('This is painfull', info)
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
			// console.log(data, moment(data.time).toLocaleString(), moment(data.time))
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
								<Input type="text" defaultValue={todo.content}
									maxLength={256} required={true}
									onChange={e => setContent(e.target.value)} />
							</FormGroup>
							<FormGroup className="col-md-3">
								<label>Due Date</label>
								<Datetime
									defaultValue={moment(todo.due_date)._d}
									inputProps={{ style: { width: '10rem' } }}
									onChange={(e) => { console.log(e._d); if (e._d) setDueTime(e._d) }}
								/>
							</FormGroup>
						</div>
						<div className='form-row'>
							<Priority {...props} setPriorityId={setPriorityId}
								priorities={props.data.priorities} defaultValue={todo.priority && todo.priority.id} />
							<Label {...props} setLabels={setLabels} labels={props.data.labels}
								labelList={todo.labels.map(item => { return { value: item.id, label: item.name } })} />
							<Project {...props} setProjectId={setProjectId}
								projects={props.data.projects.my_projects.concat(props.data.projects.shared)}
								defaultValue={todo.project.id} disabled={props.project.owner.id !== props.data.user.id} />
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
	let project = props.data.projects.my_projects.filter(p => p.id === todo.project.id)[0] || props.data.projects.shared.filter(p => p.id === todo.project.id)[0];
	const [assignees, setAssignees] = useState(todo.assignees.map(item => { return { value: item.id, label: item.name } }))
	console.log('TODOITEM', todo.priority && todo.priority.color)
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
		} else {
			alert(`Message: ${data.status.message} `)
		}
	}

	const assign = async (e, id) => {
		e.preventDefault();
		const resp = await fetch(`${props.URL}todos/assign/${id}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Token ${props.token}`
			},
			body: JSON.stringify({ assignees: assignees.map(item => item.value) })
		})
		const data = await resp.json()
		if (data.status.ok) {
			props.fetch()
			console.log('assigned', data)
		} else {
			alert(`Message: ${data.status.message} `)
		}
	}

	return (
		<div className={`todo-item d-flex ${todo.completed ? 'checked' : null}`} style={{ flexWrap: 'wrap' }}>
			<FormGroup check>
				<Button className='mx-2 my-0 p-0' color='neutral'
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
					<i className="nc-icon nc-calendar-60 mx-1" />{moment(todo.due_date).format('lll')}</span>
				<br />
				<small style={{ margin: '1rem', color: 'grey' }}>
					<i className="nc-icon nc-box mr-1" />
					<Link style={{ fontWeight: '500', fontStyle: 'italic', color: 'grey' }}
						to={`/main/projects/${project.id}/`}>{project.name}</Link>
				</small>
				{project && <><Button className='p-0 btn-link' id={`pop-${todo.id}`} data-toggle='popover'
				>
					<small><i class="fa fa-user-o" aria-hidden="true"></i></small>
				</Button>
					<UncontrolledPopover
						trigger="legacy"
						placement="bottom"
						target={`pop-${todo.id}`}
						className="popover-primary"
					>
						<PopoverHeader>Members</PopoverHeader>
						<PopoverBody style={{ minWidth: '10rem', textAlign: 'left' }}>
							<MultiSelect
								options={project.collaborators.concat(project.owner).map(item => {
									return { value: item.id, label: item.name }
								})}
								defaultValue={todo.assignees.map(item => { return { value: item.id, label: item.name } })}
								setValue={setAssignees} />
							<Button size="sm" color='danger' onClick={e => assign(e, todo.id)} className='mt-2'>Ok</Button>
						</PopoverBody>
					</UncontrolledPopover> </>}
				{todo.assignees.map(p => <Badge className='ml-1' pill color='primary' title={p.name} style={{ padding: '0.3rem 0.5rem' }}>
					{p.name[0]}</Badge>)}
			</FormGroup>
			<div className='ml-auto align-items-center d-flex'>
				{todo.labels.map(label =>
					<Badge pill style={{ fontSize: 9, backgroundColor: label.color }} className='mx-1 shadow-sm'>
						<Link to={`/main/labels/${label.id}`} style={{ color: 'white' }}>{label.name}</Link></Badge>
				)}
				<EditTodo {...props} project={project} className="p-0 btn-link" />
				<Button className='p-0 btn-link' type='button' onClick={() => deleteTodo(todo.id)}>
					<i className="fa fa-trash-o" aria-hidden="true"></i>
				</Button><br />

			</div>
			<br />
		</div>
	)
}

export default TodoItem;
