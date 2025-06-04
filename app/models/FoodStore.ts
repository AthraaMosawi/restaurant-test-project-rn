import { types, flow } from "mobx-state-tree"
import { FoodModel } from "./FoodModel"
import { api } from "@/services/api"

export const FoodStore = types
  .model("FoodStore", {
    foods: types.array(FoodModel),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchFoods: flow(function* (category: string) {
      self.isLoading = true
      self.foods.clear()
      try {
        const response = yield api.apisauce.get(`/${category}`)
        if (response.ok && Array.isArray(response.data)) {
          self.foods = response.data
        } else {
          console.error("API error:", response.problem)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        self.isLoading = false
      }
    }),
  }))
