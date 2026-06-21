import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', 'dist/**', 'build/**', '.vite/**'] },

  js.configs.recommended,

  // Fix for linting the config file itself
  {
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
  },

  // === FRONTEND: React + JSX + Vite globals ===
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        __APP_VERSION__: 'readonly',
        __BUILD_TIME__: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  // === BACKEND: Node.js (CommonJS) ===
  {
    files: ['**/*.js'],
    ignores: ['frontend/**', 'tests/**', 'eslint.config.js', 'migrations/**', 'scripts/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-console': 'warn',
      'no-empty': 'warn',
    },
  },

  // === MIGRATIONS & SEED SCRIPTS (allow console) ===
  {
    files: ['migrations/**/*.js', 'scripts/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // === CONFIG FILES (allow console for startup/debug) ===
  {
    files: ['src/config/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // === TESTS (Jest) ===
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },

  // Global rule tweaks
  {
    rules: {
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },
];