module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
