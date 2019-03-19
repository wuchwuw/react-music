import React, { lazy } from 'react'
import recommend from 'components/recommend/recommend'
const singer = lazy(() => import('components/singer/singer'))
const rank = lazy(() => import('components/rank/rank'))
const search = lazy(() => import('components/search/search'))
// const singerDetail = lazy(() => import('components/singer-detail/singer-detail'))
import singerDetail from 'components/singer-detail/singer-detail'
const topList = lazy(() => import('components/top-list/top-list'))

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