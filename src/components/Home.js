import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <section>
        <h1>{this.props.config.application}</h1>
        <p>The counter is currently {this.props.counter}.
        It's automatically incremented and decremented each time you add and delete tasks, but you can also <Link to='/counter'>manually change its value</Link>.</p>
        { this.props.todos.length !== 0 ? 
          <p>There are { this.props.todos.length } task{this.props.todos.length > 1 ? 's' : ''} now.</p> :
          <p>You can add new task <Link to='/todos/add'>here.</Link></p>}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config:state.global,
    todos:state.todos.tasks,
    counter:state.counter
  }
}

export default connect(mapStateToProps)(Home)
