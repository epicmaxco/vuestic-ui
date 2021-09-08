module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
}
