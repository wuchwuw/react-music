import React from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'
import { connect } from 'react-redux'
import { toggleTodo } from 'store/actions'

// const TodoList = ({todos, onTodoClick}) => {
//   return (
//     <ul>
//       {
//         todos.map(todo => (
//           <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>
//         ))
//       }
//     </ul>
//   )
// }
class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <ul>
        {
          this.props.todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => this.props.onTodoClick(todo.id)}/>
          ))
        }
      </ul>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  onTodoClick: PropTypes.func.isRequired
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList