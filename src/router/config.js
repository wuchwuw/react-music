import React from 'react'
import loadHome from 'bundle-loader?lazy!components/home'
import loadHello from 'bundle-loader?lazy!components/hello'
import Demo from 'bundle-loader?lazy!components/demo'
import loadChild from 'bundle-loader?lazy!components/child'
import Bundle from './boundle'

const Home = (props) => (
  <Bundle load={loadHome}>
    {(Home) => <Home {...props}/>}
  </Bundle>
)

const Hello = (props) => (
  <Bundle load={loadHello}>
    {(Hello) => <Hello {...props}/>}
  </Bundle>
)

const Child = (props) => (
  <Bundle load={loadChild}>
    {(Child) => <Child {...props}/>}
  </Bundle>
)
// const creatComponent = (Component) => {
//   return (props) => {
//     <Bundle load={Component}>
//       {(Component) => <Component {...props}/>}
//     </Bundle>
//   }
// }

// const createComponent = (component) => () => (
//   <Bundle load={component}>
//       {
//           (Component) => Component ? <Component/> : null
//       }
//   </Bundle>
// );

const routes = [
  {
    path: '/home',
    component: Home,
    routes: [
      {
        path: '/home/netflix',
        component: Child
      }
    ]
  },
  {
    path: '/hello',
    component: Hello
  }
]

export default routes