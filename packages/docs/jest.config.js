module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  transform: {
    '^.+\\js$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
