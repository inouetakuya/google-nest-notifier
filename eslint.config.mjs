import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
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
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
