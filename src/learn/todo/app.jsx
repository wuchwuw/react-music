import React from 'react'
import Footer from './Footer'
import AddTodo from './addTodo'
import TodoList from './todoList'

const App = () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
)

// class App extends React.Component {
//   componentWillMount() {
//     console.log('componentWillMount')
//   }

//   render () {
//     return (
//       <div>
//         <AddTodo />
//         <TodoList />
//         <Footer />
//       </div>
//     )
//   }
// }

export default App