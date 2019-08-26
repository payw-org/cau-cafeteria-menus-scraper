# CAU Food Scraper

It scrapes food data for 5 days(starting today) from Chungang University's restaurants'.

```zsh
% yarn add @payw/cau-food-scraper
# OR
% npm install @payw/cau-food-scraper
```

```js
// Node.js
const CAUFoodScraper = require('@payw/cau-food-scraper')

CAUFoodScraper().then(data => {
  // Do something
})

// Webpack
import CAUFoodScraper from '@payw/cau-food-scraper'

CAUFoodScraper().then(data => {
  // Do something
})
```

## Data Structure

```json
[
  {
    "date": "YYYY-MM-DD",
    "today": {
      "breakfast": [
        {
          "restaurantName": "restaurant name",
          "meals": [
            {
              "time": "HH:mm~HH:mm",
              "title": "meal title",
              "price": "$,$$$원",
              "menus": [
                "menu1",
                "menu2",
                ...
              ]
            }
            ...
          ]
        }
      ],
      "lunch": [
        // Same
      ],
      "dinner": [
        // Same
      ]
    }
  }
  ...
]
```
