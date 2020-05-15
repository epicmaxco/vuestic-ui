module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/semi': ['error', 'never'],
    'prefer-arrow-callback': 'error',
    'array-bracket-spacing': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': ['error', {'argsIgnorePattern': '^_'}],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: true,
        },
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    "id-match": ["error", "^[A-Za-z0-9\-_\$]+$", {"properties": true}], // To prevent cyrillic letters etc.
  },
}
