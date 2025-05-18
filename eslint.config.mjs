import { FlatCompat } from '@eslint/eslintrc'; // Retained in case it's used for other legacy configs, but not for next-eslint-config
import pkgTsParser from '@typescript-eslint/parser';
import nextEslintConfig from 'eslint-config-next';

// Assuming pkgTsParser is an object like { parser: actualParserObject }
// If pkgTsParser is the parser object itself (default export), then: const tsParser = pkgTsParser;
const { parser: tsParser } = pkgTsParser;

// const compat = new FlatCompat({ baseDirectory: import.meta.dirname }); // Not using for nextEslintConfig integration

export default [
  // Include Next.js's ESLint configurations.
  // This is essential for `next lint` to function correctly.
  // `eslint-config-next` usually provides an array of configs or a single config object.
  ...(Array.isArray(nextEslintConfig) ? nextEslintConfig : [nextEslintConfig]),

  // Your specific TypeScript settings.
  // Note: `eslint-config-next` likely already configures @typescript-eslint/parser for .ts/.tsx files.
  // This block can be used for overrides or additional project-specific parserOptions.
  {
    files: ['**/*.ts', '**/*.tsx'], // This might be redundant if covered by nextEslintConfig
    languageOptions: {
      parser: tsParser, // Use the imported parser object
      parserOptions: {
        project: [
          './tsconfig.json', // Root tsconfig
          './app.*/tsconfig.json', // tsconfigs in app directories (e.g., app.frontend/tsconfig.json)
          './package.*/tsconfig.json' // tsconfigs in package directories (e.g., package.prisma/tsconfig.json)
        ],
        tsconfigRootDir: import.meta.dirname, // Assuming eslint.config.mjs is at the project root
        sourceType: 'module',
      },
    },
    rules: {
      // Add any project-specific rules here
    },
  },
];