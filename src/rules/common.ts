import type { Rules } from '@antfu/eslint-config';

export const commonRules: Rules = {
  'antfu/consistent-chaining': 'off',
  'antfu/consistent-list-newline': 'off',
  'antfu/curly': 'off',
  'antfu/if-newline': 'off',
  'antfu/top-level-function': 'off',
  'array-callback-return': ['error', { allowImplicit: true }],
  'no-cond-assign': 'off',
  'no-console': 'off',
  'no-useless-return': 'warn',
  'node/prefer-global/buffer': 'off',
  'node/prefer-global/process': 'off',
  'perfectionist/sort-exports': [
    'warn',
    {
      ignoreCase: false,
      partitionByNewLine: true,
    },
  ],
  'perfectionist/sort-imports': [
    'warn',
    {
      groups: [
        ['side-effect-style', 'side-effect'],
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
      ],
      ignoreCase: false,
      internalPattern: ['^@/.*', '^#.*'],
      newlinesBetween: 'never',
    },
  ],
  'perfectionist/sort-named-imports': [
    'warn',
    {
      ignoreCase: false,
      type: 'natural',
    },
  ],
  'style/arrow-parens': ['warn', 'as-needed'],
  'style/brace-style': ['warn', '1tbs'],
  'style/indent': 'off',
  'style/member-delimiter-style': 'off',
  'style/operator-linebreak': 'off',
  'style/quote-props': 'off',
  'style/semi': 'off',
  'symbol-description': 'off',
  'unicorn/new-for-builtins': 'warn',
  'unicorn/prefer-number-properties': 'off',
  'unused-imports/no-unused-vars': 'warn',
};
