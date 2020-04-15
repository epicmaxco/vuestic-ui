import child1 from './child1.config'
import child2 from './child2.config'
import child3 from './child3.config'
import card from './card.config'
import home from './home.config'

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

const configs = {
    '/child1': child1,
    '/child2': child2,
    '/child3': child3,
    '/card': card,
    '/': home
}

export default (self) => {
    return configs[self.$route.path]
}
