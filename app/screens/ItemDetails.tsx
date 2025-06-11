import { observer } from "mobx-react-lite"
import { View, Image } from "react-native"
import { Text, Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { Header } from "@/components"
import { cateStyles } from "./MenuScreen"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./WelcomeScreen"
import { TouchableOpacity } from "react-native"
import { Icon } from "@/components/Icon"
import { useStores } from "@/models"
import { Instance } from 'mobx-state-tree';
import { FoodModel } from "@/models/FoodModel"
import { useState, useEffect } from "react"

type ItemDetailsProps = AppStackScreenProps<"Item">
type Food = Instance<typeof FoodModel>

export const ItemDetails = observer(function ItemDetails({
  route,
}: ItemDetailsProps) {
  const { itemId, categoryName } = route.params
  const { cartStore, foodStore } = useStores()

  const [item, setItem] = useState<Food | null>(null);
  const [itemLoading, setItemLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      setItemLoading(true);
      const existingItem = foodStore.foods.get(itemId);

      if (existingItem) {
          setItem(existingItem);
          setItemLoading(false);
      } else {
          console.log(`Item ${itemId} not found in global map, fetching from API.`);
          const fetchedItem = await foodStore.fetchItem(categoryName, itemId);
          setItem(fetchedItem);
          setItemLoading(false);
      }
    };

    loadItem();
  }, [categoryName, itemId, foodStore]); 

  const logo = require("../../assets/images/good-food-logo-b.png")
  const navigation = useNavigation<AppStackScreenProps<"Item">["navigation"]>()

   if (itemLoading) {
    return (
      <Screen preset="fixed" contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: "#000"}}>Loading item details...</Text>
      </Screen>
    );
  }

  if (!item) {
    console.warn(`Item with ID ${itemId} not found in foodStore.`);
    return (
      <Screen preset="fixed" contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: "#000"}}>Loading item details or Item not found.</Text>
      </Screen>
    );
  }

  return (
      <Screen preset="fixed" contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={cateStyles.header}>
            <Image source={logo} style={{ width: 130, height: 70 }} resizeMode="contain"/>
          </View>

          <View style={{ flex: 1, marginTop: 30, width: "85%" }}>
            <Image source={{ uri: item.img }} style={{ width: "100%", height: 300, borderRadius: 20 }} />
            <Text preset="heading" style={{color: "#000",marginTop: 20, marginBottom: 8}}>{item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
              <Text style={{ color: "#000", marginRight: 4 }}>{item.rate}.0</Text>
              <Icon icon="star" size={10} color="#000" />
            </View>
            <Text preset="heading" style={{color: "#000",marginTop: 10, marginBottom: 10}}>{item.price} IQD</Text>
            <Text style={{color: "#000"}}>{item.dsc}</Text>
            <Text style={{color: "#000", marginBottom: 30}}>{item.country} IQD</Text>

            <TouchableOpacity style={styles.btn} onPress={() => cartStore.increaseCartQuantity(item.id)}>
              <Text style={{color: "black", textAlign: "center", fontSize: 18}}>Add to Cart</Text>
            </TouchableOpacity>
          </View>


          <Header
            titleMode="center"
            title="© 2025 Good Food"
            titleContainerStyle={{ alignItems: "center", justifyContent: "center" }}
            titleStyle={{ display: "flex", fontSize: 10 }}
            style={{ height: 56 }}
            containerStyle={{ paddingHorizontal: 16 }}
          />
        </View>
      </Screen>
    )
})