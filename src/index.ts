import antfu from '@antfu/eslint-config';
import type { Rules } from '@antfu/eslint-config';
import { isPackageExists } from 'local-pkg';

type AntfuOptions = NonNullable<Parameters<typeof antfu>[0]>;

const enableVue = ['vue', 'nuxt', 'vitepress', '@slidev/cli'].some(pkg => isPackageExists(pkg));
const enableTypescript = isPackageExists('typescript');
const enablePrettier = isPackageExists('eslint-config-prettier');

const defaultOptions = {
  vue: enableVue
    ? {
        overrides: {
          'vue/block-order': [
            'warn',
            {
              order: ['template', 'script', 'style[scoped]', 'style:not([scoped])'],
            },
          ],
        },
      }
    : undefined,
  typescript: enableTypescript
    ? {
        overrides: {
          'ts/ban-ts-comment': 'off',
          'ts/explicit-member-accessibility': ['warn', { accessibility: 'no-public' }],
          'ts/member-ordering': 'warn',
          'ts/no-use-before-define': 'off',
          'ts/no-wrapper-object-types': 'warn',
          'ts/consistent-type-imports': [
            'warn',
            {
              prefer: 'type-imports',
              disallowTypeAnnotations: false,
              fixStyle: 'separate-type-imports',
            },
          ],
        },
      }
    : undefined,
  jsonc: false,
  yaml: false,
  markdown: false,
  ignores: ['**/*.js'],
} satisfies AntfuOptions;

const overrideRules: Rules = {
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
  'perfectionist/sort-imports': [
    'warn',
    {
      ignoreCase: false,
      newlinesBetween: 'never',
      internalPattern: ['^@/.*', '^#.*'],
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
    },
  ],
  'perfectionist/sort-exports': [
    'warn',
    {
      ignoreCase: false,
      partitionByNewLine: true,
    },
  ],
};

const mergeOptionsWithRules = <T extends { overrides?: Rules }>(
  source: { overrides?: Rules },
  target: T,
): T => {
  const options = {
    ...source,
    ...target,
  };

  if (target.overrides) {
    options.overrides = {
      ...source.overrides,
      ...target.overrides,
    };
  }

  return options;
};

const getMergedOptions = (target?: AntfuOptions) => {
  if (!target || Object.keys(target).length === 0) return defaultOptions;

  const options = {
    ...defaultOptions,
    ...target,
  };

  if (defaultOptions.vue && typeof target.vue === 'object') {
    options.vue = mergeOptionsWithRules(defaultOptions.vue, target.vue);
  }

  if (defaultOptions.typescript && typeof target.typescript === 'object') {
    options.typescript = mergeOptionsWithRules(defaultOptions.typescript, target.typescript);
  }

  return options;
};

const config: typeof antfu = (options, ...userConfigs) =>
  antfu(
    getMergedOptions(options),
    enablePrettier ? import('eslint-config-prettier').then(m => m.default) : {},
    { rules: overrideRules },
    ...userConfigs,
  );

export default config;
