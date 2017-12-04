import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { tasksTypes, tasksActions } from '../store/tasks/tasksTypesActions'

class TodoForm extends Component {

    state = {
        success:false
    }

    createTask = (label, done = false) => {
        return {
            label:label,
            done:done,
            id:uuid.v1()
        }
    }

    isFormValid = () => {
        
        if (!this.labelInput.value.trim().length) {
            this.labelInput.focus()
            return false
        } 

        return true

    }

    componentWillUnmount () {
        if (this.props.todo) {
            this.props.unselectTodo()
        }
    }

    handleForm = (e) => {
        e.preventDefault();
        this.setState({success:false})
        if (this.isFormValid() && !this.props.todo) {
            const task = this.createTask(this.labelInput.value.trim(), this.doneInput.checked)
            this.props.addTodo(task)
            this.form.reset()
            this.labelInput.focus()
            this.setState({success:true})
        } else if (this.isFormValid() && this.props.todo) {
            const todo = {
                label:this.labelInput.value.trim(),
                done:this.doneInput.checked,
                id:this.props.todo.id
            }
           this.props.updateTodo(todo)
           this.props.history.push('/todos')
        }
    }

    render () {
        return (
            <form className='todo-form' ref={ form => this.form = form } onSubmit={ this.handleForm }>
                <h2>{ this.props.todo ? 'Edit task' : 'Add task'}</h2>
                <div>
                    <label htmlFor='label'>Task</label>
                    <input defaultValue={(this.props.todo && this.props.todo.label) ? this.props.todo.label : ''} ref={ label => this.labelInput = label }  id='label' type='text' />
                </div>
                <div>
                    <label htmlFor='done'><input
                        defaultChecked={(this.props.todo && this.props.todo.done) ? true : false} 
                        ref={ done => this.doneInput = done } 
                        type='checkbox' id='done' /> completed</label>
                </div>
                <input type='submit' value={this.props.todo ? 'Edit' : 'Add'} />
                { this.state.success && <p><button aria-label='Close' className='small' onClick={ () => this.setState({success:false}) }><img aria-hidden='true' alt='' src="https://png.icons8.com/close-window/androidL/32" width="14" height="14" /></button> Task successfully added </p> }
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        todo:state.todos.updatedTask
    }
}

const actions = dispatch => {
    return {
        addTodo:(todo) => {
            dispatch(tasksActions[tasksTypes.ADD_TODO](todo))
        },
        updateTodo:(todo) => {
            dispatch(tasksActions[tasksTypes.UPDATE_TODO](todo))
        },
        unselectTodo:() => {
            dispatch(tasksActions[tasksTypes.SELECT_TODO](null))
        }
    }
}

export default connect(mapStateToProps, actions)(TodoForm)