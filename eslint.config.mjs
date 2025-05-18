import { FlatCompat } from '@eslint/eslintrc';
import parser from '@typescript-eslint/parser';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...compat.extends('next/core-web-vitals'),

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './app.*/tsconfig.json',
          './package.*/tsconfig.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // You can safely add overrides here
    },
  },
];