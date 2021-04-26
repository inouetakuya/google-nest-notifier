require('dotenv').config({ path: '.env.test' })

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  testRegex: '/test/.*\\.spec\\.ts$',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
}
