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

## Return Data

Below is overall data schema of an example return value. Check out the type definitions for more information.

```js
{
  campus: 'seoul'
  days: [
    {
      date: Date, // Original JS Date object
      breakfast: [
        {
          name: "restaurant name",
          meals: [
            {
              time: "HH:mm~HH:mm",
              title: "meal title",
              price: "$,$$$ 원",
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
}
```
