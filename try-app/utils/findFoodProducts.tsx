import { FoodProducts } from "../models/FoodProducts";
import foodProductsJson from '../data/foodproducts.json';

export function findFoodProducts(): FoodProducts {
  const foodProducts = foodProductsJson as FoodProducts;

  return foodProducts;
}