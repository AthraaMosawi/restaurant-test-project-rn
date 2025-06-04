import { observer } from "mobx-react-lite"
import { View, Image } from "react-native"
import { Text, Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { Header } from "@/components"
import { PressableIcon } from "@/components/Icon"
import { cateStyles } from "./MenuScreen"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./WelcomeScreen"
import { TouchableOpacity } from "react-native"
import { Icon } from "@/components/Icon"

type ItemDetailsProps = AppStackScreenProps<"Item">

export const ItemDetails = observer(function ItemDetails({
  route,
}: ItemDetailsProps) {
  const { item } = route.params

  const logo = require("../../assets/images/good-food-logo-b.png")
  const navigation = useNavigation<AppStackScreenProps<"Item">["navigation"]>()

  return (
      <Screen preset="fixed" contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Header
            titleMode="center"
            LeftActionComponent={
              <PressableIcon icon="back" size={24} onPress={() => navigation.push("CategoryDetails", { category: item.name })} />
            }
            RightActionComponent={
              <PressableIcon icon="cart" size={24} onPress={() => alert("Not Yet :(")} />
            }
            title={item.name}
            titleContainerStyle={{ alignItems: "center", justifyContent: "center" }}
            titleStyle={{ display: "flex" }}
            style={{ height: 56 }}
            containerStyle={{ paddingHorizontal: 16 }}
          />

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
            <TouchableOpacity style={styles.btn} onPress={() => alert("In progress...")}>
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