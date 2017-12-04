import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { tasksTypes, tasksActions } from '../store/tasks/tasksTypesActions'

const Todo = ({label,done, onRemove, id, onToggle, onSelect}) => {
    let className = done ? 'done' : null
    return (
        <div className='todo'> 
            <span className={className}>{label}</span> 
            <span className='todo-actions'>
                <button onClick={ () => onToggle(id) }>{done ? 'Uncomplete' : 'Complete'}</button>
                <button onClick={ () => onSelect(id) }>Edit</button>
                <button onClick={ () => onRemove(id) }>&times;</button>
            </span>        
        </div>
    )
}

const parseSearchPath = path => {
    // new URLSearchParams will be more suitable for the job but no supported everywhere yet
    const parts = path.replace('?','').split('=')
    return {
        [parts[0]]:parts[1]
    }
}

class TodoList extends Component {

    state = {
        filter:'all'
    }

    changeLocation = (e) => {
        
        this.setState({
            filter:this.filterInput.value
        }, () => {
            switch (this.state.filter) {
                case 'all':
                    this.props.history.push('/todos')
                    break
                case 'done':
                    this.props.history.push('/todos?filter=done')
                    break
                case 'undone':
                    this.props.history.push('/todos?filter=undone')
                    break
                default:
                    this.props.history.push('/todos')
            }
        })        

    }

    renderTodos = () => {

        let search = parseSearchPath(this.props.location.search)
        
        const task = (t) => {
            return (
                <li key={t.id}>
                    <Todo 
                        onSelect={ this.selectTodo } 
                        onToggle={ this.toggleStatusTodo } 
                        onRemove={ this.removeTodo } {...t} />
                </li>)
        }
        
        const todos = () => {
            
            if (this.props.location.search) {

                if (search.filter) {
                    if (search.filter === 'done' || search.filter === 'undone') {
                        const done = search.filter === 'done' ? true : false
                        const tasks = this.props.todos.filter( t => t.done === done )
                        if (tasks.length) {
                            return tasks.map(t => {
                                return task(t)
                            })
                        } else {
                            return <p>Task completed</p>
                        }                            
                    }
                }
            }

            return this.props.todos.map(t => {
                return task(t)
            })
        }

        const title = () => {
            switch(this.state.filter) {
                case 'done':
                    return <h2>Completed tasks</h2>
                case 'undone':
                    return <h2>Uncompleted tasks</h2>
                default:
                    return <h2>All tasks</h2>
            }
        }

        if (this.props.todos.length) {
            return (
                <div>
                    { title() }
                    <ul className='todo-list'>
                        { todos() }
                    </ul>
                    <section className="filters">
                        <h3>Filters</h3>
                        <select ref={select => this.filterInput = select } onChange={ this.changeLocation } name="filter" id="filter">
                            <option value="all">All tasks</option>
                            <option value="done">Completed tasks</option>
                            <option value="undone">Uncompleted tasks</option>
                        </select>
                    </section>
                </div>
            )
        } else {
            return <p>No tasks at the moment.</p>
        }
    }

    removeTodo = (todoId) => {
        this.props.removeTodo(todoId)
    }

    toggleStatusTodo = (todoId) => {
        this.props.toggleStatusTodo(todoId)
    }

    selectTodo = (todo) => {
        this.props.selectTodo(todo)
        this.props.history.push('/todos/edit')
    }

    removeAllTodos = () => {
        this.props.removeAllTodos()
    }

    render () {
        return (
            <section>
                { this.renderTodos() }
                <Link to='/todos/add' style={{textDecoration:'none'}}><h3><img aria-hidden='true' src="https://png.icons8.com/external-link-squared/androidL/24" title="Link Squared" width="16" height="16" alt='' /> Add a task</h3></Link>
                { this.props.todos.length > 0 ? <button onClick={ () => this.removeAllTodos() }>Delete all tasks</button> : null }
            </section>
        )
    }

}

const mapPropsToState = state => {
    return {
        todos:state.todos.tasks
    }
}

const actions = dispatch => {
    return {
        removeTodo:(todoId) => {
            dispatch(tasksActions[tasksTypes.REMOVE_TODO](todoId))
        },
        toggleStatusTodo:(todoId) => {
            dispatch(tasksActions[tasksTypes.TOGGLE_TODO_STATE](todoId))
        },
        selectTodo:(todoId) => {
            dispatch(tasksActions[tasksTypes.SELECT_TODO](todoId))
        },
        removeAllTodos:() => {
            dispatch(tasksActions[tasksTypes.RESET_TODO]())
        }
    }
}

export default connect(mapPropsToState, actions)(TodoList)