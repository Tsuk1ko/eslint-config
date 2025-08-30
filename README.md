# eslint-config

Kirin's ESLint config preset, based on [antfu/eslint-config](https://github.com/antfu/eslint-config).

I prefer using prettier over eslint for formatting, so this configuration includes `eslint-config-prettier`.

## Usage

### Install

```bash
npm i -D @tsuk1ko/eslint-config @antfu/eslint-config eslint eslint-config-prettier
```

### Auto-generate configuration

```bash
npx tec-init
```

This will generate `eslint.config.mjs` and `.prettierrc.json` and **overwrite existing files**.

### Manual configuration

Create `eslint.config.mjs`:

```js
import config from '@tsuk1ko/eslint-config';

export default config();
```

Create `.prettierrc.json`:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "useTabs": false,
  "tabWidth": 2,
  "semi": true
}
```

### Custom

This package provides the same parameters as antfu/eslint-config for customization. Please refer to the antfu/eslint-config documentation for details.
