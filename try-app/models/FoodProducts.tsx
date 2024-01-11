export type FoodProducts = {
  data: FoodProduct[]
}

export type FoodProduct = {
  id: number
  name: string
  description: string
  price: number
  weight: number
  category: string
  origin: string
}
