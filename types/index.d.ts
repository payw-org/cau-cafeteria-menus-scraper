export type Meal = {
  time: string
  title: string
  price: string
  menus: string[]
}

export type Restaurant = {
  name: string
  meals: Meal[]
}

export type Day = {
  date: string
  timeGroup: {
    breakfast: Restaurant[]
    lunch: Restaurant[]
    supper: Restaurant[]
  }
}

export type ScrapedData = {
  campus: 'seoul' | 'anseong'
  days: Day[]
}

export type Config = {
  id: string
  pw: string
  days: number
}

export function CAUFS(config: Config): Promise<ScrapedData>
