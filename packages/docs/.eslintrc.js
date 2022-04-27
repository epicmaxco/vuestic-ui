module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    indent: ['error', 2, { ignoreComments: true, SwitchCase: 1 }],
    'prefer-arrow-callback': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'vue/html-closing-bracket-spacing)': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    'id-match': ['error', '^[A-Za-z0-9-_$]+$', { properties: true }], // To prevent cyrillic letters etc.
    'vue/html-closing-bracket-spacing': 'error',
  },
  overrides: [
    {
      files: ['src/components/*.vue', 'src/components/**/*.vue'],
      rules: {
        'vue/require-name-property': 'error',
      },
    },
  ],
}
