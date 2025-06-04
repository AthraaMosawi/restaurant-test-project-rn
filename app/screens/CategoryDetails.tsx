import { observer } from "mobx-react-lite"
import { View, FlatList, Image} from "react-native"
import { Text, Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "@/models"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./WelcomeScreen"
import { $styles } from '@/theme';
import { FoodCard } from "@/components/FoodCard"
import { Header } from "@/components"
import { PressableIcon } from "@/components/Icon"
import { cateStyles } from "./MenuScreen"


type CategoryDetailsScreenProps = AppStackScreenProps<"CategoryDetails">


export const CategoryDetails = observer(function CategoryDetails({
  route,
}: CategoryDetailsScreenProps) {
  const { foodStore } = useStores()
  const { category } = route.params

 const logo = require("../../assets/images/good-food-logo-b.png")
  
  useEffect(() => {
    foodStore.fetchFoods(category)
  }, [category])
  
  const navigation = useNavigation<AppStackScreenProps<"CategoryDetails">["navigation"]>()
  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={styles.container}>
        <Header
          titleMode="center"
          LeftActionComponent={
            <PressableIcon icon="back" size={24} onPress={() => navigation.push("Menu")} />
          }
          RightActionComponent={
            <PressableIcon icon="cart" size={24} onPress={() => alert("Not Yet :(")} />
          }
          title="Meals"
          titleContainerStyle={{ alignItems: "center", justifyContent: "center" }}
          titleStyle={{ display: "flex" }}
          style={{ height: 56 }}
          containerStyle={{ paddingHorizontal: 16 }}
        />

        <View style={cateStyles.header}>
          <Image source={logo} style={{ width: 130, height: 70 }} resizeMode="contain"/>
        </View>

        <Text style={{color: "#000", fontSize: 20, marginBottom: 20, marginTop: 20}}>
          {category}
        </Text>

        <View style={{ flex: 1 }}>
          {foodStore.isLoading ? (
            <Text style={{color: "#000"}}>Loading...</Text>
          ) : (
            <FlatList
              data={foodStore.foods}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16, gap: 12 }}
              renderItem={({ item }) => (
                <FoodCard
                  food={item}
                  onPress={() => navigation.push("Item", { item })}
                />
              )}
            />
          )}
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
