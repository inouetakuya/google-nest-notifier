import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  js.configs.recommended,

  // Ignore Files - ESLint - Pluggable JavaScript Linter
  // https://eslint.org/docs/latest/use/configure/ignore
  includeIgnoreFile(gitignorePath),

  {
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: typescriptEslintParser,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
