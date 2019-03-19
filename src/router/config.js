import React, { lazy } from 'react'
import recommend from 'components/recommend/recommend.jsx'
const singer = lazy(() => import('components/singer/singer.jsx'))
const rank = lazy(() => import('components/rank/rank.jsx'))
const search = lazy(() => import('components/search/search.jsx'))
const singerDetail = lazy(() => import('components/singer-detail/singer-detail.jsx'))
const topList = lazy(() => import('components/top-list/top-list.jsx'))

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