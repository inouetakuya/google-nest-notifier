module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '/__tests__/.*\\.spec\\.ts$',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
}
