import { kebabCase } from 'lodash';
import {RouteObject, useNavigate} from 'react-router-dom';
import {ComponentType, lazy, Suspense, useEffect} from 'react';

// 使用import.meta.glob动态导入views目录下的所有文件
const views = import.meta.glob('@/pages/**/*.tsx');
// 定义正则表达式匹配文件路径
const regex = /\/src\/views\/(.*)\/index\.tsx/;
// 为每个文件创建一个RouteObject
const routesPromise: Promise<RouteObject>[] = Object.keys(views).map((key) => {
    const match = key.match(regex);
    let folder = '';
    if (match && match[1]) {
        folder = match[1];
    }
    const ComponentPromise = views[key]().then((module): ComponentType => lazy(() => Promise.resolve(module as { default: ComponentType<any> })));
    const routePromise: Promise<RouteObject> = ComponentPromise.then((Component: ComponentType) => {
        const route: RouteObject = {
            path: `/${kebabCase(folder)}`,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
            <Component />
            </Suspense>
    ),
    };
        return route;
    });

        return routePromise;
    });
    function RedirectToHome() {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/home');
        }, [navigate]);
        return null;
    }
    export const getRoutes = async () => {
        const routes = await Promise.all(routesPromise);
        // 将 Home 页面的路由放到最后
        const homeRouteIndex = routes.findIndex(route => route.path === '/home');
        if (homeRouteIndex !== -1) {
            const homeRoute = routes.splice(homeRouteIndex, 1)[0];
            routes.push(homeRoute);
        }
        // 添加一个新的 RouteObject，当路径为 '/' 时，重定向到 '/home'
        routes.push({
            path: '/',
            element: <RedirectToHome />
        });
        return routes;
    };