import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { PressableIcon } from "@/components/Icon"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"


interface CartIconProps {
  onPress: () => void
}

const CartIcon: React.FC<CartIconProps> = observer(({ onPress }) => {
  const { cartStore } = useStores()

  const displayQuantityBubble = cartStore.cartQuantity > 0

  return (
    <View style={styles.container}>
      <PressableIcon onPress={onPress} size={24} icon="cart" />

      {displayQuantityBubble ? (
        <View style={styles.badge}>
          <Pressable onPress={onPress}>
            <Text style={styles.badgeText}>{cartStore.cartQuantity}</Text>
          </Pressable>
        </View>
      ):
      <View style={styles.badge}>
          <Pressable onPress={onPress}>
            <Text style={styles.badgeText}>0</Text>
          </Pressable>
        </View>
      }
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    position: "relative",
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#FE9738",
    borderRadius: 10, 
    paddingHorizontal: 6, 
    paddingVertical: 2,
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  badgeText: {
    color: "black",
    fontSize: 10,
  },
})

export default CartIcon

