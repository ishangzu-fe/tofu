import config from 'config';
import views from 'views';

import Portal from 'portal';
import Auth from 'portal/auth';

const routes = [
    { path: '/auth/:token', component: Auth },
    { path: config.root, component: Portal, children: [] }
]

const extractRoutes = (views) => {
    return Object.keys(views).map(key => {
        let children;
        
        let _children = views[key].children;
        if (_children.length) {
            children = extractRoutes(_children);
        }

        return {
            children,
            path: key,
            component: views[key]
        }
    })
}

const children = extractRoutes(views);

routes.forEach(v => {
    if (v.path === config.root) {
        v.children = children;
    }
})

export default routes;