import React from 'react';
import { UncontrolledTooltip, Badge } from 'reactstrap'
import Share from 'components/ShareProject';
import TodoItem from 'components/Todo';


function Todos(props) {
	const id = props.match.params.id;
	const data = props.data;
	let todos, header, project;
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
							{project.collaborators.map(p => <Badge className='ml-1' pill color='default' title={p.name} >
								{p.name[0]}</Badge>)}</small>
							{/* <Badge id="sharing" className='mx-1' pill>{collabs}</Badge>
							<small><a>Change</a></small>
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