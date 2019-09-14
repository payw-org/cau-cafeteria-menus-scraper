# CAU Food Scraper(CAUFS)

A CAU restaurant menu scraper for Node.js

---

> **_NOTE:_** You should follow the migration guide in favor of v2 release.

---

### What's new in v2

- 🎯 Promise-based precise data scraping without any wasting of time
- 🚀 Boost up to 5x faster
- 🗑 Reduce dependencies which are totally unnecessary

### Installation

```zsh
npm install @payw/cau-food-scraper
# OR
yarn add @payw/cau-food-scraper
```

```js
// Node.js
const foodScrape = require('@payw/cau-food-scraper').default

// webpack
import foodScrape from '@payw/cau-food-scraper'

foodScrape({
  id: 'portalId',
  pw: 'portalPw',
  days: 1 // optional (default: 5)
}).then(data => {
  // Do something
})
```

### Migration from v1 to v2

You should import the library differently.

```js
/* v1 */
// Node.js
const foodScrape = require('@payw/cau-food-scraper').default
// webpack
import foodScrape from '@payw/cau-food-scraper'

/* v2 */
// Node.js
const { CAUFS } = require('@payw/cau-food-scraper')
// webpack
import { CAUFS } from '@payw/cau-food-scraper'
```

Returning data type of `Day` and its children types had been slightly changed. The package includes a type definition with more detailed information.

```ts
/* v1 */
type Day = {
  date: string
  breakfast: Food[]
  lunch: Food[]
  supper: Food[]
}

/* v2 */
type Day = {
  date: string
  timeGroup: {
    breakfast: Restaurant[]
    lunch: Restaurant[]
    supper: Restaurant[]
  }
}
```
