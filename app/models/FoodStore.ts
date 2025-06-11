import { types, flow, Instance } from "mobx-state-tree"
import { FoodModel } from "./FoodModel"
import { api } from "@/services/api"

type Food = Instance<typeof FoodModel>

export const FoodStore = types
  .model("FoodStore", {
    foods: types.map(FoodModel),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchFoods: flow(function* (category: string) {
      self.isLoading = true
      try {
        const response = yield api.apisauce.get(`/${category}`)
        if (response.ok && Array.isArray(response.data)) {
          response.data.forEach((foodData: any) => {
            const foodWithCategory = { ...foodData, category: category };
            self.foods.set(foodWithCategory.id, foodWithCategory as Food);
          })
        } else {
          alert(`API error: ${response.problem}`)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        self.isLoading = false
      }
    }),

    fetchAllFoods: flow(function* () {
      self.isLoading = true;
      try {
        const allCategories = [
          "Burgers", "Best Foods", "Breads", "Barbecues", "Chocolates",
          "Desserts", "Drinks", "Fried-Chicken", "Ice-Cream", "Pizzas",
          "Porks", "Sandwiches", "Sausages", "Steaks", "Our Foods"
        ];
        for (const category of allCategories) {
          const response = yield api.apisauce.get(`/${category}`);
          if (response.ok && Array.isArray(response.data)) {
            response.data.forEach((foodData: any) => {
              const foodWithCategory = { ...foodData, category: category };
              self.foods.set(foodWithCategory.id, foodWithCategory as Food);
            });
          } else {
            console.warn(`Failed to load foods for category ${category}: ${response.problem}`);
          }
        }
      } catch (error) {
        console.error("Fetch all foods error:", error);
      } finally {
        self.isLoading = false;
      }
    }),

    fetchItem: flow(function* (category: string, itemId: string) {
      self.isLoading = true
      try {
        const response = yield api.apisauce.get(`/${category}/${itemId}`)
        if (response.ok && response.data) {
          const fetchedFood = response.data as Food;
          const foodWithCategory = { ...fetchedFood, category: category };
          self.foods.set(foodWithCategory.id, foodWithCategory as Food);
          return foodWithCategory;
        } else {
          console.error(`API error fetching item ${itemId} from category ${category}: ${response.problem}`)
          return null
        }
      } catch (error) {
        console.error(`Fetch item error for ${itemId} in ${category}:, error`)
        return null
      } finally {
        self.isLoading = false
      }
    }),
  }))
