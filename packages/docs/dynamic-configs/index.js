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
    '/card': card,
    '/': home
}

export default (self) => {
    return configs[self.$route.path]
}
