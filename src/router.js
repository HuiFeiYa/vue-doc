import { createRouter, createWebHashHistory } from 'vue-router'
/**
 * https://cn.vitejs.dev/guide/features#glob-import
 * 接收参数
 * as: 'raw'  类似于 以字符串形式导入资源
 */
const modules = import.meta.glob('./views/*.vue', { eager: true })
/** 获取文件夹下文件，动态设置为路由 */
const routes = Object.entries(modules).map(([filePath, component]) => {
    const fileName = filePath.replace(/^.+\/([\w-]+)\.\w+$/, '$1');
    return {
        path: `/${fileName}`,
        name: fileName,
        component: component.default || component
    };
});
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})