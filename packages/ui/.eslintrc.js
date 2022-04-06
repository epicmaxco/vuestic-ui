module.exports = {
  root: true,
  env: {
    node: true,
    jest: true, // Optimal way to do this is through overrides, but they didn't work for me.
  },
  extends: [
    'plugin:vue/vue3-essential',
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
    indent: ['error', 2, { ignoreComments: true, SwitchCase: 1 }],
    'prefer-arrow-callback': 'error',
    'lines-between-class-members': 'off',
    'array-bracket-spacing': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    'id-match': ['error', '^[A-Za-z0-9-_$]+$', { properties: true }], // To prevent cyrillic letters etc.
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-multiple-template-root': 'off',
    // remove when this issue will be resolved: https://github.com/import-js/eslint-plugin-import/issues/2228
    'import/export': 'warn',
    'no-void': 'off',
  },
  overrides: [
    {
      files: ['src/components/**/*.vue'],
      excludedFiles: ['*.demo.vue', '*.vdemo.vue'],
      rules: {
        'vue/require-name-property': 'error',
      },
    },
  ],
  ignorePatterns: ['**/*spec.disabled.*', '**/wip-*/**'],
}
