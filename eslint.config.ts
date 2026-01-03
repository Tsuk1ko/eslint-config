import config from './src';

export default config(undefined, {
  rules: {
    'perfectionist/sort-objects': ['warn'],
  },
  files: ['src/rules/*.ts'],
});
