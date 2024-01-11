import foodProductsJson from '../data/foodproducts.json';
import { FoodProducts, FoodProduct } from '../models/FoodProducts';

export function findFoodProductById(id: number): FoodProduct {
  const foodProducts = foodProductsJson as FoodProducts;
  const foodProduct = foodProducts.data.find(fp => fp.id === id);

  if (!foodProduct) {
    throw new Error(`Food product with id ${id} not found`);
  }

  return foodProduct;
}