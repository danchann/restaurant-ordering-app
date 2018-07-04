import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
// const Menu = () => import('./components/Menu.vue')
import Admin from './components/Admin.vue'
// const Admin = () => import(/* webpackChunkName: "footer-group" */ './components/Admin.vue')
import About from './components/About.vue'
// const About = () => import(/* webpackChunkName: "footer-group" */ './components/About.vue')
import Contact from './components/Contact.vue'
import History from './components/History.vue'
import Delivery from './components/Delivery.vue'
import OrderingGuide from './components/OrderingGuide.vue'

export const routes = [{
    path: '/',
    name: 'homeLink',
    components: {
      default: Home,
      "ordering-guide": OrderingGuide,
      "history": History,
      "delivery": Delivery,
    }
  },
  {
    path: '/menu',
    name: 'menuLink',
    component: Menu
  },
  {
    path: '/admin',
    name: 'adminLink',
    component: Admin,
    beforeEnter: (to, from, next) => {
      //   alert('This area is for authorised users only, please login to continue.')
      next();
    }
  },
  {
    path: '/about',
    name: 'aboutLink',
    component: About,
    children: [{
        path: '/contact',
        name: 'contactLink',
        component: Contact
      },
      {
        path: '/history',
        name: 'historyLink',
        component: History
      },
      {
        path: '/ordering-guide',
        name: 'orderingGuideLink',
        component: OrderingGuide
      },
      {
        path: '/delivery',
        name: 'deliveryLink',
        component: Delivery
      },
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
