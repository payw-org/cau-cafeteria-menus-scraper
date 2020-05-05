# CAU Cafeteria Menus Scraper (CCMS) ![npm](https://img.shields.io/npm/v/@payw/cau-cafeteria-menus-scraper)

A CAU cafeteria menus scraper for Node.js

## What's new in v2

- 🎯 Promise-based precise data scraping without a piece of time wasting
- 🚀 Boost up to 5x faster
- 🗑 Remove dependencies which are totally unnecessary

## Installation

```zsh
npm install @payw/cau-cafeteria-menus-scraper
```

## Usage

```js
const { CCMS } = require('@payw/cau-cafeteria-menus-scraper')

CCMS({
  id: 'portalId',
  pw: 'portalPw',
  days: 1 // optional (default: 5)
}).then(data => {
  // Do something
})
```

### TypeScript Support

The package contains its type definitions. But you can also install types only.

```bash
npm install --save-dev @payw/cau-cafeteria-menus-scraper-types
```

## Migration

### `v2.0.x` → `v2.1.x` Migration Guide

We renamed the package to 'cau-cafeteria-menus-scraper'. Also the key of the return object has been changed.

```js
/* v2.0.x */
// Node.js
const { CAUFS } = require('@payw/cau-food-scraper')
// webpack
import { CAUFS } from '@payw/cau-food-scraper'

/* v2.1.x */
// Node.js
const { CCMS } = require('@payw/cau-cafeteria-menus-scraper')
// webpack
import { CCMS } from '@payw/cau-cafeteria-menus-scraper'
```
