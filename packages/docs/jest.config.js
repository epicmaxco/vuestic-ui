module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.(js|vue)',
    '!src/**/*.demo.vue',
  ],
  coverageReporters: ['text', 'text-summary'],
}
