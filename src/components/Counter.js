import React, { Component } from 'react'
import { connect } from 'react-redux'
import { counterActions, counterTypes } from '../store/counter/counterTypesActions'

class Counter extends Component {

    increment = () => {
        this.props.dispatch(counterActions[counterTypes.INCREMENT]())
    }

    decrement = () => {
        this.props.dispatch(counterActions[counterTypes.DECREMENT]())
    }

    reset = () => {
        this.props.dispatch(counterActions[counterTypes.RESET]())
    }

    render () {
        return (
            <section>
                <h1>Counter</h1>
                <p>Let's count it : {this.props.counter}</p>
                <div className='counter'>
                    <button onClick={ this.increment }>Increment</button>
                    <button onClick={ this.decrement }>Decrement</button>
                    <button onClick={ this.reset }>Reset</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        counter:state.counter
    }
}

export default connect(mapStateToProps)(Counter)