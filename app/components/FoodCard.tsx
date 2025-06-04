import React from "react"
import { Image, Text, View } from "react-native"
import { Card } from "@/components/Card"
import { Icon } from "@/components/Icon"

interface FoodCardProps {
  food: {
    id: string
    img: string
    name: string
    dsc: string
    price: number
    rate: number
    country: string
  }
  onPress?: () => void
}

export function FoodCard({ food, onPress }: FoodCardProps) {
  return (
    <Card
      style={{backgroundColor: "#f9f9f9", borderWidth:0, paddingBottom: 20, paddingTop: 20}}
      heading={food.name}
      headingStyle={{color: "#000", fontSize: 18, marginBottom: 8}}
      ContentComponent={
        <View>
          <Text style={{ fontSize: 12, color: "#000" }}>{food.dsc}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: "#000", marginRight: 4 }}>{food.rate}.0</Text>
            <Icon icon="star" size={10} color="#000" />
          </View>
        </View>
      }
      contentStyle={{fontSize: 12, color: "#000"}}
      footer={`$${food.price.toFixed(2)}`}
      footerStyle={{color: "#FE9738", fontSize: 18, marginTop: 10}}
      onPress={onPress}
      LeftComponent={
        <Image
          source={{ uri: food.img }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 12,
            marginRight: 12,
          }}
          resizeMode="contain"
        />
      }
    />
  )
}
