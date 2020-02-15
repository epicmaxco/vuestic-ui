module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  'extends': [
    '@vue/standard',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'curly': 'error',
    'array-bracket-spacing': ['error', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
