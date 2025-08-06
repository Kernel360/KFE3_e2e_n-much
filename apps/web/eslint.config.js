import { nextJsConfig } from '@repo/eslint-config/next-js';
import pluginImport from 'eslint-plugin-import';
import pluginUnicorn from 'eslint-plugin-unicorn';

export default [
  ...nextJsConfig,
  {
    plugins: {
      import: pluginImport,
      unicorn: pluginUnicorn
    },
    rules: {
      // 기본 JavaScript/TypeScript 규칙
      'func-style': ['error', 'expression'],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-empty-function': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'prefer-template': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],

      // Import 관련 규칙
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          'newlines-between': 'never',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'react/**',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import/no-duplicates': 'error',

      // TypeScript 관련 규칙
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        // 변수: camelCase 기본
        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },

        // 함수: camelCase
        {
          selector: 'function',
          format: ['camelCase']
        },
        // React 컴포넌트: PascalCase (JSX 리턴하는 함수)
        {
          selector: 'variable',
          format: ['PascalCase'],
          filter: {
            regex: '^[A-Z]',
            match: true
          }
        },
        // 상수: UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE'],
          filter: {
            regex: '^[A-Z][A-Z_]*$',
            match: true
          }
        },
        // 타입/인터페이스: PascalCase
        {
          selector: ['typeLike'],
          format: ['PascalCase']
        },
        // 이벤트 핸들러: handle로 시작하는 camelCase
        {
          selector: ['variable', 'function'],
          format: ['camelCase'],
          filter: {
            regex: '^handle[A-Z].*',
            match: true
          }
        },
        // 커스텀 훅: use로 시작하는 camelCase
        {
          selector: ['variable', 'function'],
          format: ['camelCase'],
          filter: {
            regex: '^use[A-Z].*',
            match: true
          }
        }
      ],

      // React 관련 규칙
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-pascal-case': 'error',

      // 파일명 규칙
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true
          }
        }
      ],

      // 기타 품질 규칙
      'no-magic-numbers': ['error', { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }],
      'consistent-return': 'warn'
    }
  },
  // API Route 파일은 특별 규칙
  {
    files: ['**/app/api/**/route.ts'],
    rules: {
      'func-style': 'off',
      '@typescript-eslint/naming-convention': 'off'
    }
  },
  // React 컴포넌트에만 export 맨 아래 규칙 적용
  {
    files: ['**/*.tsx', '**/components/**/*.ts'],
    ignores: ['**/metadata.ts', '**/layout.tsx', '**/page.tsx'],
    rules: {
      'import/exports-last': 'error'
    }
  }
];
