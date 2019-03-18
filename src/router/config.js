import React from 'react'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
import topList from 'components/top-list/top-list'
// import loadHome from 'bundle-loader?lazy!learn/home'
// import loadHello from 'bundle-loader?lazy!learn/hello'
// import Demo from 'bundle-loader?lazy!learn/demo'
// import loadChild from 'bundle-loader?lazy!learn/child'
// import Bundle from './boundle'

// const Home = (props) => (
//   <Bundle load={loadHome}>
//     {(Home) => <Home {...props}/>}
//   </Bundle>
// )

// const Hello = (props) => (
//   <Bundle load={loadHello}>
//     {(Hello) => <Hello {...props}/>}
//   </Bundle>
// )

// const Child = (props) => (
//   <Bundle load={loadChild}>
//     {(Child) => <Child {...props}/>}
//   </Bundle>
//)
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
    path: '/recommend',
    component: recommend,
  },
  {
    path: '/singer',
    component: singer,
    routes: [
      {
        name: 'singerDetail',
        path: '/singer/:id',
        component: singerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: rank,
    routes: [
      {
        name: 'rankDetail',
        path: '/rank/:id',
        component: topList
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    routes: [
      {
        name: 'searchSinger',
        path: '/search/:id',
        component: singerDetail
      }
    ]
  }
]

export default routes