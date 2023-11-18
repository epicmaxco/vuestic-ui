module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    // parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    '@nuxt/eslint-config',
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "warn",
    "vue/component-name-in-template-casing": ["error", "PascalCase", {
      registeredComponentsOnly: false,
      ignores: ["transition", "component"],
    }],
    "vue/max-attributes-per-line": ["error", {
      singleline: {
        max: 4
      },
    }],
  },
}
