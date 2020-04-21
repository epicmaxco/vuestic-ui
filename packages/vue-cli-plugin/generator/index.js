module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      // TODO Should use ^1.0.0 once it's out
      'vuestic-ui': '*'
    }
  })
}
