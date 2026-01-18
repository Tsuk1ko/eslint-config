import antfu from '@antfu/eslint-config';
import type { Rules } from '@antfu/eslint-config';
import { isPackageExists } from 'local-pkg';
import { commonRules, tsRules, vueRules } from './rules/index.js';

type AntfuOptions = NonNullable<Parameters<typeof antfu>[0]>;

const enableVue = ['vue', 'nuxt', 'vitepress', '@slidev/cli'].some(pkg => isPackageExists(pkg));
const enableTypescript = isPackageExists('typescript');
const enablePrettier = isPackageExists('eslint-config-prettier');

const defaultOptions = {
  vue: enableVue ? { overrides: vueRules } : undefined,
  typescript: enableTypescript ? { overrides: tsRules } : undefined,
  jsonc: false,
  yaml: false,
  toml: false,
  markdown: false,
  pnpm: false,
  ignores: ['**/*.js'],
} satisfies AntfuOptions;

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

const getMergedOptions = (target?: AntfuOptions): AntfuOptions => {
  if (!target || Object.keys(target).length === 0) return defaultOptions;

  const options: AntfuOptions = {
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
    ...(enablePrettier ? [import('eslint-config-prettier').then(m => m.default)] : []),
    {
      name: 'kirin/common-rules',
      rules: commonRules,
    },
    ...userConfigs,
  );

export default config;
