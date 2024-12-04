import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";
import TabNavigator from "./TabNavigator";

const RootStack = createNativeStackNavigator();

export const AppNavigator = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right", // Añade una animación suave
        }}
      >
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ animationEnabled: true }}
        />
        <RootStack.Screen
          name="MainApp"
          component={TabNavigator}
          options={{ animationEnabled: true }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
