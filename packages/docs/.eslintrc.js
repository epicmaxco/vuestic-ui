module.exports = {
  root: true,
  env: {
    node: true,
    jest: true, // Optimal way to do this is through overrides, but they didn't work for me.
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    curly: 'error',
    'prefer-arrow-callback': 'error',
    'array-bracket-spacing': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
      singleline: {
        delimiter: 'comma',
        requireLast: true,
      },
    }]
  },
}
