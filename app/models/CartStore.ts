import { types } from "mobx-state-tree"
import { CartItemModel } from "./CartItemModel"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const CartStore = types
  .model("CartStore", {
    cartItems: types.array(CartItemModel),
  })
  .views((self) => ({
    get cartQuantity() {
      return self.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    getItemQuantity(id: string) {
      return self.cartItems.find((item) => item.id === id)?.quantity || 0
    },
  }))
  .actions((self) => {
    const persistCart = async () => {
      try {
        await AsyncStorage.setItem("food-cart", JSON.stringify(self.cartItems))
      } catch (e) {
        console.error("Save cart error", e)
      }
    }

    const loadCart = async () => {
      try {
        const stored = await AsyncStorage.getItem("food-cart")
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            self.cartItems.replace(parsed)
          } else {
            console.warn("Stored cart data is not an array, clearing cart:", parsed)
            self.cartItems.clear()
          }
        }
      } catch (e) {
        console.error("Load cart error", e)
        self.cartItems.clear()
      }
    }

    return {
      afterCreate() {
        loadCart()
      },
      increaseCartQuantity(id: string) {
        const item = self.cartItems.find((i) => i.id === id)
        if (item) item.quantity++
        else self.cartItems.push({ id, quantity: 1 })
        persistCart()
      },
      decreaseCartQuantity(id: string) {
        const item = self.cartItems.find((i) => i.id === id)
        if (item?.quantity === 1) self.cartItems.remove(item)
        else if (item) item.quantity--
        persistCart()
      },
      removeFromCart(id: string) {
        const item = self.cartItems.find((i) => i.id === id)
        if (item) self.cartItems.remove(item)
        persistCart()
      },
    }
  })
