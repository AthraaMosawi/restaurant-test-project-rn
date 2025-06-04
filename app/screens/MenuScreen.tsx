import { observer } from "mobx-react-lite"
import { View, FlatList, Image, TouchableOpacity, ScrollView } from "react-native"
import { Text, Screen } from "@/components"
import { $styles } from "@/theme"
import { AppStackScreenProps } from "../navigators"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./WelcomeScreen"
import { StyleSheet } from "react-native"
import { Header } from "@/components"
import { PressableIcon } from "@/components/Icon"


type MenuScreenProps = AppStackScreenProps<"Menu">

const categories = [
  { name: "Burgers", image: require("../../assets/images/burgers.png") },
  { name: "Best Foods", image: require("../../assets/images/best-food.png") },
  { name: "Breads", image: require("../../assets/images/breads.png") },
  { name: "Barbecues", image: require("../../assets/images/bbq.png")},
  { name: "Chocolates", image: require("../../assets/images/chocolate.png") },
  { name: "Desserts", image: require("../../assets/images/desserts.png") },
  { name: "Drinks", image: require("../../assets/images/drinks.png") },
  { name: "Fried-Chicken", image: require("../../assets/images/fried-chicken.png") },
  { name: "Ice-Cream", image: require("../../assets/images/ice-cream.png") },
  { name: "Pizzas", image: require("../../assets/images/pizza.png") },
  { name: "Porks", image: require("../../assets/images/porks.png") },
  { name: "Sandwiches", image: require("../../assets/images/sandwich.png") },
  { name: "Sausages", image: require("../../assets/images/sausages.png") },
  { name: "Steaks", image: require("../../assets/images/steaks.png") },
  { name: "Our Foods", image: require("../../assets/images/our-foods.png") },
]

const logo = require("../../assets/images/good-food-logo-b.png")

export const MenuScreen = observer(function MenuScreen(_props: MenuScreenProps) {

  const navigation = useNavigation<AppStackScreenProps<"Menu">["navigation"]>()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={styles.container}>
        <Header
          titleMode="center"
          LeftActionComponent={
            <PressableIcon icon="back" size={24} onPress={() => navigation.push("Welcome")} />
          }
          RightActionComponent={
            <PressableIcon icon="cart" size={24} onPress={() => alert("Not Yet :(")} />
          }
          title="Categories"
          titleContainerStyle={{ alignItems: "center", justifyContent: "center" }}
          titleStyle={{ display: "flex" }}
          style={{ height: 56 }}
          containerStyle={{ paddingHorizontal: 16 }}
        />
        <View style={cateStyles.header}>
          <Image source={logo} style={{ width: 130, height: 70 }} resizeMode="contain"/>
        </View>

        <Text style={{color: "#000", fontSize: 20, marginBottom: 20, marginTop: 20}}>
          Order Your Favorite Food!
        </Text>

        <FlatList
            data={categories}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "center",
              paddingHorizontal: 16,
              marginBottom: 6,
            }}
            style={{width: "100%"}}
            contentContainerStyle={{ paddingVertical: 16 }}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: "50%",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  padding: 8,
                  borderRadius: 6,
                  margin: 6,
                }}
                onPress={() => navigation.push("CategoryDetails", { category: item.name })}
              >
                <Image source={ item.image } style={{ width: 140, height: 160, marginBottom: 5 }} resizeMode="contain" />
                <Text style={{ textAlign: "center", color: "black", marginBottom: 5 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
        />

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

export const cateStyles = StyleSheet.create({
  header: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FE9738",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
});