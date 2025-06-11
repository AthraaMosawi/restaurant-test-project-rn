import { types } from "mobx-state-tree"

export const FoodModel = types.model("Food", {
  id: types.identifier,
  img: types.string,
  name: types.string,
  dsc: types.string,
  price: types.number,
  rate: types.number,
  country: types.string,
  category: types.string,
})
