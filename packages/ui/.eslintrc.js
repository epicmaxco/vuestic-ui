module.exports = {
  root: true,
  env: {
    node: true,
    jest: true, // Optimal way to do this is through overrides, but they didn't work for me.
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'prefer-arrow-callback': 'error',
    'array-bracket-spacing': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    'id-match': ['error', '^[A-Za-z0-9\-_\$]+$', { 'properties': true }], // To prevent cyrillic letters etc.
    'vue/html-closing-bracket-spacing': 1,
  },
}
