module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts?'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['unused-imports', 'react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-shadow': 'off',

    'react-native/no-inline-styles': 0,
    'prettier/prettier': 'warn',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    semi: ['error', 'always'],
  },
};
