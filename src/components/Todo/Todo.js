import React from 'react'
import { Checkbox } from '@material-ui/core'
import styles from './style.module.css'
import { withStyles } from '@material-ui/core/styles';

const PurpleCheckbox = withStyles({
    root: {
      color: '#ca89e9',
      '&$checked': {
        color: '#ca89e9',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

export default function Todo({ todo, toggleTodo }) {
    function hadleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div className={`${styles.todo} ${todo.complete ? styles.completed : ''}`}>
            <div>
                <div className={styles.name}>{todo.name}</div>
                <div className={styles.description}>{todo.description || '-'}</div>
            </div>

            <PurpleCheckbox
                checked={todo.complete}
                onChange={hadleTodoClick}/>
        </div>
    )
}
