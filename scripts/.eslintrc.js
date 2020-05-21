module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'only-multiline'
    }]
  }
}
