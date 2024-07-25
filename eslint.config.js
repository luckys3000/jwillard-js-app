import pluginPrettier from 'eslint-plugin-prettier';

// Create the ESLint recommended configuration
const eslintRecommendedConfig = {
  languageOptions: {
    globals: {
      // Define global variables here if needed
      window: 'readonly',
      document: 'readonly',
    },
  },
  plugins: {
    prettier: pluginPrettier,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-console': 'warn',
    // Add other ESLint rules you want
  },
};

// Create the Prettier configuration
const prettierConfig = {
  rules: {
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        singleQuote: true,
        parser: 'flow',
        trailingComma: 'all',
        tabWidth: 2,
        endOfLine: 'lf', //Ensure LF line
        // Add any additional Prettier rules you want
      },
    ],
  },
};

// Export the configurations
export default [eslintRecommendedConfig, prettierConfig];
