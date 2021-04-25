import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const Layout = () =>
    import ('@/pages/layout/index.vue');
const button = () =>
    import ('@/pages/button/index.vue');
const bookmark = () =>
    import ('@/pages/bookmark/index.vue');
const checkbox = () =>
    import ('@/pages/checkbox/index.vue');
const dropdown = () =>
    import ('@/pages/dropdown/index.vue');
const scratchCard = () =>
    import ('@/pages/scratch-card/index.vue');
const slots = () =>
    import ('@/pages/slots/index.vue');
const tabs = () =>
    import ('@/pages/tabs/index.vue');
const verification = () =>
    import ('@/pages/verification/index.vue');
const collapse = () =>
    import ('@/pages/collapse/index.vue');
const rate = () =>
    import ('@/pages/rate/index.vue');

const routes = [{
        path: '/',
        component: Layout
    },
    {
        path: '/layout',
        meta: {
            title: 'Layout布局'
        },
        component: Layout
    },
    {
        path: '/button',
        meta: {
            title: '按钮'
        },
        component: button
    },
    {
        path: '/bookmark',
        meta: {
            title: '书签'
        },
        component: bookmark
    },
    {
        path: '/checkbox',
        meta: {
            title: '复选框'
        },
        component: checkbox
    },
    {
        path: '/dropdown',
        meta: {
            title: '下拉菜单'
        },
        component: dropdown
    },
    {
        path: '/slots',
        meta: {
            title: '老虎机'
        },
        component: slots
    },
    {
        path: '/tabs',
        meta: {
            title: '标签页'
        },
        component: tabs
    },
    {
        path: '/scratch-card',
        meta: {
            title: '刮刮卡'
        },
        component: scratchCard
    },
    {
        path: '/verification',
        meta: {
            title: '验证'
        },
        component: verification
    },
    {
        path: '/collapse',
        meta: {
            title: '折叠面板'
        },
        component: collapse
    },
    {
        path: '/rate',
        meta: {
            title: 'Rate评分'
        },
        component: rate
    },
];


const router = new VueRouter({
    routes,
    mode: 'hash'
});


router.beforeEach((to, form, next) => {
    window.document.title = to.meta.title;
    next();
});

export default router;