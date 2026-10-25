import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'

export default [
  { ignores: resolveIgnoresFromGitignore() },
  ...neostandard({
    env: ['node', 'vitest'],
    noJsx: true,
    noStyle: true
  }),
  {
    rules: {
      curly: ['error', 'all']
    }
  }
]
