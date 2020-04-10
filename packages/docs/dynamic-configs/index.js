import child1 from './child1.config.js'
import child2 from './child2.config.js'
import home from './home.config.js'

// TODO: implement scalable config maping

// const configs = require.context('../dynamic-configs/', true, /\.config\.js$/);
// const keys = configs.keys()
// debugger;
// const filesArray = Array.from(configs.keys())
// let configsModule;

// export const paths = filesArray.map(config => config.replace(/\.(\/[^\.]*)\.config\.js/, '$1'));
// configsModule = paths.reduce((acc, path, index) => {
//     acc[path] = () => import(filesArray[index])
//     return acc
// }, {})
// debugger;
// console.log(configsModule)

export default {
    '/child1': child1,
    '/child2': child2,
    '/': home
}