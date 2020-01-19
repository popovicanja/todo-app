import React from 'react'
import Todo from '../Todo/Todo'
import styles from './style.module.css'

export default function TodoList({ todos, toggleTodo }) {
    if (!todos || todos.length === 0) return (
        <div className={styles.noData}>Insert your first Todo</div>
    )
    return (
        <div className={styles.container}>
            { 
                todos.map(todo => {
                    return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                })
            }
        </div>
    )
}

