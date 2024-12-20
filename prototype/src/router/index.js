import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssessmentView from '../views/AssessmentView.vue'
import ResultsView from '../views/ResultsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/assessment/:projectName/:requirementName',
    name: 'Assessment',
    component: AssessmentView,
    props: true
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AssessmentView.vue')
  },
  {
    path: '/results/:projectName',
    name: 'Results',
    component: ResultsView,
    props: true
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/ResultsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
