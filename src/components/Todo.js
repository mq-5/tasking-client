import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, Badge } from 'reactstrap';
import { bold } from 'ansi-colors';

function TodoItem(props) {
    let todo = props.todo;
    // console.log('TODOITEM', props)
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
        <div className={`todo-item d-flex ${todo.completed ? 'checked' : null}`}>
            <FormGroup check>
                <Button className='mx-2 p-0' color='neutral'
                    onClick={() => toggleTodo(todo.id)}>
                    <i className={`fa fa-${todo.completed ? 'check-' : ''}circle-o`}
                        style={{ color: todo.completed ? 'lightgray' : 'grey', fontSize: '1.2rem' }}
                        aria-hidden="true"></i>
                </Button>
                {todo.content}{' '}
                {todo.priority ? <small >
                    <i style={{ color: todo.priority.color, margin: '1rem' }} className="fa fa-flag" aria-hidden="true"></i> </small> : null}
                <br />
                <small style={{ textDecoration: 'underline', fontStyle: 'italic', margin: '1rem' }}>
                    <i className="nc-icon nc-box mx-2" /> {todo.project}
                </small>
                {todo.labels.map(label =>
                    <Badge href="#" pill style={{ fontSize: 9, backgroundColor: label.color }} className='mx-1'>
                        {label.name}</Badge>
                )}
            </FormGroup>
            <div className='ml-auto'>
                <Button className='ml-2 p-0' color='neutral' onClick={() => deleteTodo(todo.id)}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </Button>
            </div>
        </div>
    )
}

export default TodoItem;