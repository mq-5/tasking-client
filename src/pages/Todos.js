import React from 'react';
import { UncontrolledPopover, Button, PopoverBody, Badge } from 'reactstrap';
import Share from 'components/ShareProject';
import TodoItem from 'components/Todo';


function Todos(props) {
	const id = props.match.params.id;
	const data = props.data;
	let todos, header, project;

	const removeMember = async id => {
		let info = { user_id: id, project_id: project.id }
		const resp = await fetch(`${props.URL}projects/remove-member/`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Token ${props.token}`
			},
			body: JSON.stringify(info)
		})
		const data = await resp.json()
		if (data.status.ok) {
			props.fetch()
			console.log('Removed', data)
		} else {
			alert(`Message: ${data.status.message} `)
		}
	}
	try {
		if (props.match.path.includes('projects')) {
			try {
				project = data.projects.my_projects.filter(p => p.id === parseInt(id))[0] || data.projects.shared.filter(p => p.id === parseInt(id))[0]
				todos = project.todos;
				let collabs = project.collaborators.length;
				header = (
					<div className='d-flex align-items-baseline'>
						<h3 className='mb-3'><strong>{project.name.toUpperCase()}</strong></h3>
						{collabs > 0 ? <>
							<small className='ml-3'>Shared with
							{project.collaborators.map(member => <>
								<Badge className='ml-1' pill color='default' title={member.name} id={`collab-${member.id}`} data-toggle='popover'>
									{member.name[0]}</Badge>
								<UncontrolledPopover
									trigger="legacy"
									placement="bottom"
									target={`collab-${member.id}`}
									className="popover-primary"
								>
									<PopoverBody style={{ minWidth: '10rem', textAlign: 'left' }}>
										Remove member?
										<Button className='btn-link m-1' size="sm" color='danger' onClick={e => { e.preventDefault(); removeMember(member.id) }}>
											Yes</Button>
									</PopoverBody>
								</UncontrolledPopover>
							</>)}</small>
							{/* <Badge id="sharing" className='mx-1' pill>{collabs}</Badge>
							<UncontrolledTooltip placement="bottom" target="sharing">
								{project.collaborators.map(item => <li style={{ listStyleType: 'none' }}>{item.name}</li>)}
							</UncontrolledTooltip>  */}
						</> : null}
						<Share project_id={project.id} {...props} className='ml-auto' />
					</div>)
			} catch {
				todos = null
			}
		} else if (props.match.path.includes('today')) {
			todos = data.today
			header = <h3 className='mb-3'><strong>{'today'.toUpperCase()}</strong></h3>
		} else if (props.match.path.includes('search')) {
			let key = props.match.params.key;
			todos = data.todos.filter(item => item.content.toLowerCase().includes(key.toLowerCase()))
			header = <h3 className='mb-3'><strong>{'search results'.toUpperCase()} for "{key}"</strong></h3>
		} else if (props.match.path.includes('labels')) {
			let id = props.match.params.id;
			todos = data.todos.filter(todo => todo.labels.map(label => label.id).includes(parseInt(id)));
			header = <h3 className='mb-3'><strong>{`Tagged`.toUpperCase()}</strong></h3>
		}
		return (<>
			{header}
			{todos && todos.map(todo => <TodoItem todo={todo} {...props} />)}</>
		)
	}
	catch {
		return <h2> Can't find project '{project.name}'</h2>;
	}
}

export default Todos;