/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps } from "react"
import { FoodModel } from "../models/FoodModel"
import { Instance } from 'mobx-state-tree';
import CartIcon from "@/components/CartIcon"
import * as Linking from "expo-linking" 
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

type Food = Instance<typeof FoodModel>

export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
  Menu:undefined
  Item: { categoryName: string; itemId: string }
  CategoryDetails: { category: string }
  Cart: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true, 
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: "#190F16", 
          height: 56, 
        },
        headerTintColor: "#FFFFFF",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          display: "flex",
        },
        headerRight: () => <CartIcon onPress={() => navigation.navigate("Cart")} />,
      })}
    >

      <Stack.Screen
        name="Welcome"
        component={Screens.WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={Screens.MenuScreen}
        options={{ title: "Categories" }}
      />
      <Stack.Screen
        name="Item"
        component={Screens.ItemDetails}
        options={{ title: "Item Details" }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={Screens.CategoryDetails}
        options={({ route }) => ({ title: route.params.category })}
      />
      <Stack.Screen
        name="Cart"
        component={Screens.CartScreen}
        options={{ title: "Your Cart" }}
      />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
      {/* Add all your other screens here */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
      screens: {
        Welcome: "welcome",
        Menu: "menu",
        Cart: "cart",
        CategoryDetails: "/:category",
        Item: "/:categoryName/:itemId",
      },
    },
  }

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props} linking={linking}>
        <Screens.ErrorBoundary catchErrors={Config.catchErrors}>
          <AppStack />
        </Screens.ErrorBoundary>
      </NavigationContainer>
    </ThemeProvider>
  )
})
