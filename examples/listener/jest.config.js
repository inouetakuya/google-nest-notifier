import { config } from 'dotenv'

config({ path: '.env.test' })

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '/__tests__/.*\\.spec\\.ts$',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
}
