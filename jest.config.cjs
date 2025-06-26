/** @type {import('jest').Config} */
module.exports = {
    transform: { '^.+\\.js$': 'babel-jest' },
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/*.test.js', '**/__tests__/**/*.test.js'],
  };
  