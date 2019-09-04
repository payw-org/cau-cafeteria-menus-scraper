# CAU Food Scraper

It scrapes food data for 5 days(default, starting today) from Chungang University's restaurants.

```zsh
npm install @payw/cau-food-scraper
```

```js
// Node.js
const foodScrape = require('@payw/cau-food-scraper').default

// webpack
import foodScrape from '@payw/cau-food-scraper'

foodScrape({
  id: 'portal-id',
  pw: 'portal-pw',
  days: 1 // optional (default: 5)
}).then(data => {
  // Do something
})
```

## Data Structure

It supports type definition. Below is overall data schema of return value.

```js
[
  {
    date: "YYYY-MM-DD",
    breakfast: [
      {
        name: "restaurant name",
        meals: [
          {
            time: "HH:mm~HH:mm",
            title: "meal title",
            price: "$,$$$원",
            menus: [
              "menu1",
              "menu2",
              ...
            ]
          }
          ...
        ]
      }
    ],
    lunch: [
      // Same
    ],
    supper: [
      // Same
    ]
  }
  ...
]
```
