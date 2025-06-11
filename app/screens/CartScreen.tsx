import React from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native" // Added StyleSheet for consistency
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"
import { AppStackParamList } from "@/navigators"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { Instance } from "mobx-state-tree"
import { FoodModel } from "@/models/FoodModel"
import { Button } from "@/components/Button" 
import { Icon } from "@/components"

type CartScreenProps = NativeStackScreenProps<AppStackParamList, "Cart">

export const CartScreen = observer(() => {
  const { cartStore, foodStore } = useStores()

  const navigation = useNavigation<CartScreenProps["navigation"]>()


  const getItem = (id: string) => foodStore.foods.get(id) as Instance<typeof FoodModel> | undefined;


  const total = cartStore.cartItems.reduce((sum, item) => {
    const food = getItem(item.id)
    return sum + (food?.price || 0) * item.quantity
  }, 0)

  return (
    <View style={styles.container}>
      {cartStore.cartQuantity === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
          <Button text="Go to Menu" style={styles.btn} onPress={() => navigation.navigate("Menu")} />
        </View>
      ) : (
        <FlatList
          data={cartStore.cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const food = getItem(item.id)
            if (!food) {
                console.warn(`Food item with ID ${item.id} not found in foodStore.`)
                return (
                    <View style={styles.cartItemContainer}>
                        <Text style={styles.itemNotFoundText}>Item not found (ID: {item.id})</Text>
                        <Button style={styles.btn} onPress={() => cartStore.removeFromCart(item.id)} />
                    </View>
                );
            }
            return (
              <View style={styles.cartItemContainer}>
                <Image source={{ uri: food.img }} style={styles.imgs} resizeMode="contain"/>
                <Text style={styles.cartItemText}>{food.name} x {item.quantity}</Text>
                <Text style={styles.cartItemText}>${(food.price * item.quantity).toFixed(2)}</Text>
                <Button style={styles.btn} onPress={() => cartStore.removeFromCart(item.id)}>
                  <Icon icon="remove" size={18}/>
                </Button>
              </View>
            )
          }}
        />
      )}
      <View style={{backgroundColor: "#FE9738", marginBottom: 10}}>
        {cartStore.cartQuantity > 0 && (
          <Text style={styles.cartTotalText}>Total: ${total.toFixed(2)}</Text>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  cartItemText: {
    color: '#000',
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#FE9738",
    color: "#000",
    borderWidth: 0
  },
  imgs:{
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 8,
  },
  itemNotFoundText: {
    color: 'red',
    fontSize: 16,
    fontStyle: 'italic',
  },
  cartTotalText: {
    fontSize: 22,
    padding: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
});
