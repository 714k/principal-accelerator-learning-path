import tseslint from 'typescript-eslint';
export default tseslint.config(...tseslint.configs.recommended, {
  files: ['**/*.ts'], rules: { '@typescript-eslint/no-explicit-any': 'error' }
}, {
  files: ['site/shared/assets/*.js'],
  languageOptions: { globals: { document: 'readonly', localStorage: 'readonly' } },
  rules: { 'no-undef': 'error', 'no-unused-vars': 'error' }
});
