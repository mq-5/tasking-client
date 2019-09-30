import React from 'react';
import TodoItem from 'components/Todo';

function Todos(props) {
	const project = props.match.params.project;
	const data = props.data;
	// console.log('tood', props, project);
	let todos, header;
	try {
		if (project) {
			todos = data.projects.filter(p => p.name.toLowerCase() === project.toLowerCase())[0].todos;
			header = project
		} else if (props.match.path.includes('today')) {
			todos = data.today
			header = 'today'
		} else if (props.match.path.includes('search')) {
			todos = data.todos.filter(item => item.content.includes(props.match.params.key))
			header = 'search results'
		}
		return (<>
			<h3 className='mb-3'><strong>{header.toUpperCase()}</strong></h3>
			{todos.map(todo => <TodoItem todo={todo} {...props} />)}</>
		)
	}
	catch {
		return <h2> Can't find project '{project}'</h2>;
	}
}

export default Todos;