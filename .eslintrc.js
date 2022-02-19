module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    /**
     * [default extends]
     * extends moved from eslintConfig in package.json.
     */
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'prefer-const': 'error',
    'no-param-reassign': ['error', { props: false }],
    'jsx-a11y/label-has-associated-control': 'off',
    'max-len': ["error", { "code": 100, "tabWidth": 2 }]
  },
};
