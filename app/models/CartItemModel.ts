import {types} from "mobx-state-tree"

export const CartItemModel = types.model("CartItemModel", {
    id: types.string,
    quantity: types.number,
})