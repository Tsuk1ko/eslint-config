import type { Rules } from '@antfu/eslint-config';

export const vueRules: Rules = {
  'vue/block-order': [
    'warn',
    {
      order: ['template', 'script', 'style[scoped]', 'style:not([scoped])'],
    },
  ],
};
