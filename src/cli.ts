#!/usr/bin/env node
import { writeFileSync } from 'node:fs';

writeFileSync(
  '.prettierrc.json',
  JSON.stringify(
    {
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'all',
      arrowParens: 'avoid',
      useTabs: false,
      tabWidth: 2,
      semi: true,
    },
    null,
    2,
  ),
);

writeFileSync(
  'eslint.config.mjs',
  `import config from '@tsuk1ko/eslint-config';

export default config();`,
);
