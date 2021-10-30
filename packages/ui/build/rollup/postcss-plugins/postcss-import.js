import postcssImport from 'postcss-import'
import postcssImportResolver from 'postcss-import/lib/resolve-id'

/**
 * @param options { postcssImport.AtImportOptions }
 */
export default (options) => postcssImport({
  ...options,
  resolve: (id, basedir, options) => {
    // PostcssImport automatically trying to resolve relative module, and then trying to resolve it from node_modules
    // Webpack '~' alias that resolve to node_modules should be deleted
    if (/^~/.test(id)) {
      id = id.slice(1)
    }

    return postcssImportResolver(id, basedir, options)
  },
})
