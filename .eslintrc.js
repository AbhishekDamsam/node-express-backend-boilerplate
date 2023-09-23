module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    "rules": {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": ["error", {"args": "none"}],
      "no-console": 2,
    }
  };