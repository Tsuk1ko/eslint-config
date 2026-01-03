import type { Rules } from '@antfu/eslint-config';

export const tsRules: Rules = {
  'ts/ban-ts-comment': 'off',
  'ts/consistent-type-imports': [
    'warn',
    {
      disallowTypeAnnotations: false,
      fixStyle: 'separate-type-imports',
      prefer: 'type-imports',
    },
  ],
  'ts/explicit-member-accessibility': [
    'warn',
    {
      accessibility: 'no-public',
    },
  ],
  'ts/member-ordering': 'warn',
  'ts/no-use-before-define': 'off',
  'ts/no-wrapper-object-types': 'warn',
};
