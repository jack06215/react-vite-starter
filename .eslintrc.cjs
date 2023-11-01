module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'unused-imports'],
  overrides: [
    {
      files: ['src/**/*.{js,ts,tsx}'],
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroups: [
              {
                pattern: '@alias/**',
                group: 'parent',
                position: 'before',
              },
            ],
            alphabetize: {
              order: 'asc',
            },
            'newlines-between': 'always',
          },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/no-unknown-property': [
          'error',
          {
            ignore: ['css'],
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
