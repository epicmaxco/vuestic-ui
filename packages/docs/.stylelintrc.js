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
    'selector-pseudo-class-no-unknown': null,
    'value-keyword-case': null,
    'length-zero-no-unit': null,
    indentation: [2, { baseIndentLevel: 1 }],
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
  },
  ignoreFiles: ['dist/**/*'],
}
