import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FoodStore } from "./FoodStore"
import { CartStore } from "./CartStore"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    foodStore: types.optional(FoodStore, {}),
    cartStore: types.optional(CartStore, {}), 
})
export const rootStore = RootStoreModel.create({
  foodStore: {
    foods: {},
    isLoading: false,
  },
  cartStore:  {
    cartItems: [],
  },
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
