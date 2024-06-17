module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'graphql.schema.ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      { 'newlines-between': 'always-and-inside-groups' },
    ],
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreProperties: false },
    ],
    'prettier/prettier': ['error', { 'endOfLine': 'auto' }],
    'max-len': ['error', { 'code': 160 }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
