import React, { lazy } from 'react'
import recommend from 'components/recommend/recommend'
const singer = lazy(() => import('components/singer/singer'))
const rank = lazy(() => import('components/rank/rank'))
const search = lazy(() => import('components/search/search'))
// const singerDetail = lazy(() => import('components/singer-detail/singer-detail'))
import singerDetail from 'components/singer-detail/singer-detail'
import topList from 'components/top-list/top-list'
import disc from 'components/disc/disc'

const routes = [
  {
    path: '/recommend',
    component: recommend,
    routes: [
      {
        name: 'disc',
        path: '/recommend/:id',
        component: disc
      }
    ]
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