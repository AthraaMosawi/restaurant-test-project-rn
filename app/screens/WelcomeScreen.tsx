import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Image, TouchableOpacity, View} from "react-native"
import { Text, Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native";

const welcomeLogo = require("../../assets/images/good-food-logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {

  const navigation = useNavigation<AppStackScreenProps<"Welcome">["navigation"]>()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={styles.container}>
        <Image style={styles.img} source={welcomeLogo} resizeMode="contain" />
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Menu")}>
          <Text style={{color: "black"}}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  img:{
    width: 200,
    height: 100,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: "#FEA82F",
    padding: 8,
    borderRadius: 5,
  }
});