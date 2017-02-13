/**
 * @file
 * Created by hanan on 16/10/15.
 */
//const Hello = r => require(['views/hello'], r);
const NotFound = r => require(['views/notfound'], r);//404路由 notfound route
const index = r => require(['views/index'], r);//默认路由 default route
const myCloset = r => require(['../views/myCloset'], r); //myCloset子路由页面
const Scenarios = r => require(['../views/Scenarios'], r); //myCloset子路由页面
const myCloset_index = r => require(['../components/My_Closet/index.vue'], r);//myCloset 路由
//登陆
const login = r => require(['views/login'], r);
//风格选择
const preference = r => require(['views/preference'], r);
const importing = r => require(['views/importing'], r);
//const index = r => require(['views/index'], r);
//const myCloset = r => require(['../routes/myCloset'], r); //myCloset子路由页面
const myClosetList = r => require(['../views/myClosetList'], r);
const mix = r => require(['../views/mix'], r);
const scenarios = r => require(['../views/scenarios'], r); //myCloset子路由页面
const personal = r => require(['../views/personal'], r);
const search = r => require(['../views/newSearch'], r);//search 页面
const productInfo = r => require(['../views/productInfo'], r);
const test = r => require(['../views/test'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
    {
        //默认路由 设置为myCloset  default route is myCloset
        path: '',
        redirect: {name: 'login'}
    }, {
        path: '/index',
        component: index, name: 'index',
        //主路由为index mainRoute is index
        children: [
            {path: '', redirect: {name: 'myCloset'}},
            //子路由为myCloset  Child Route is myCloset
            //子路由为path: '',
            {path: '', redirect: {name: 'myCloset'}},
            {path: 'myCloset', component: myCloset, name: 'myCloset'},
            {path: 'Scenarios', component: Scenarios, name: 'Scenarios'},

        ]
    }, {
        path: '/new',
        component: myCloset_index
    }, {
        path: '/login',
        component: login,
        name: 'login'
    }, {
        path: '/preference',
        component: preference,
        name: 'preference'
    }, {
        path: '/importing',
        component: importing,
        name: 'importing'
    }, {
        path: '/mix', component: mix, name: 'mix'
    }, {
        path: '/search', component: search, name: 'search'
    }, {
        path: '/productInfo', component: productInfo, name: 'productInfo'
    },{
        path:'/test',
        component:test
    }
    /*
     , {
     path: '/index',
     component: index,
     name: 'index',
     children: [
     {path: '', redirect: 'myCloset'},
     {
     path: 'myCloset',
     component: myCloset,
     name: 'myCloset',
     children: [
     {path: '', redirect: 'list'},
     {path: 'list', component: myClosetList, name: 'myClosetList'}
     ]
     }, {
     path: 'scenarios', component: scenarios, name: 'scenarios'
     }, {
     path: 'personal', component: personal, name: 'personal'
     }
     ]
     },
     */
].map(route => {
    route.path = rootPath + route.path;
    return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
