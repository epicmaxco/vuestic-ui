module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'no-empty-source': null,
    'font-family-no-missing-generic-family-keyword': null,
    'block-no-empty': null,
    'no-descending-specificity': null,
    'color-hex-length': 'long',
    'color-hex-case': 'lower',
    'at-rule-no-unknown': null,
    'value-list-max-empty-lines': 1,
    'function-calc-no-unspaced-operator': null,
    'value-keyword-case': null,
    'length-zero-no-unit': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    indentation: [2, { baseIndentLevel: 0 }],
  },
  ignoreFiles: ['dist/**/*', 'storybook-static/**/*'],
}
