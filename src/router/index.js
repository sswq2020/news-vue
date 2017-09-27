import Vue from 'vue'
import VueRouter from 'vue-router'
import news from 'components/news/news'
import hotspot from 'components/hotspot/hotspot'
import technology from 'components/technology/technology'
import propertyMarket from 'components/propertyMarket/propertyMarket'
import peopleWelfare from 'components/peopleWelfare/peopleWelfare'
import finance from 'components/finance/finance'
import law from 'components/law/law'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/news'
}, {
    path: '/news',
    component: news
}, {
    path: '/hotspot',
    component: hotspot
}, {
    path: '/technology',
    component: technology
}, {
    path: '/propertyMarket',
    component: propertyMarket
}, {
    path: '/peopleWelfare',
    component: peopleWelfare
}, {
    path: '/finance',
    component: finance
}, {
    path: '/law',
    component: law
}]

export default new VueRouter({
    linkActiveClass: 'active',
    routes
})