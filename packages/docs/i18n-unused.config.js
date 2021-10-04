module.exports = {
  srcExtensions: ['ts', 'vue'],
  srcPath: 'src',
  localesPath: 'src/locales',
  excludeKey: ['.props.'],
  translationKeyMatcher: /(?:[$ .](_|t|tc|tie))\(.*?\)/gi,
}
