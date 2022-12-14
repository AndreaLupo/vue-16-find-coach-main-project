import {createRouter, createWebHistory} from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach =  () => import('./pages/requests/ContactCoach.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const UserAuth =  () => import('./pages/auth/UserAuth.vue');


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'coaches' },
        { path: '/coaches', component: CoachList },
        { 
            path: '/coaches/:id', 
            component: CoachDetail,
            props: true, 
            children: [
            { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } } ,
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});



router.beforeEach(function(to, from, next) {
    // if route requires auth and user is not authenticated
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        // redirect to auth page
        next('/auth');
    } else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
        // route requires that users is not auth, while user is authenticated
        next('/coaches');
    } else {
        next();
    }
});


// https://stackoverflow.com/questions/46359421/vuerouter-is-changing-the-route-even-before-calling-vue-beforecreate-function
store.dispatch('tryAutoLogin');

export default router;