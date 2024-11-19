import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font"; 

import Landing from "./components/Landing";
import SignIn from "./components/SignIn";
import Reservas from "./components/Reservas";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Pasarela from "./components/Pasarela";
import ToDoFamiliar from "./components/ToDoFamiliar";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reservas"
          component={Reservas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Pasarela"
          component={Pasarela}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToDoFamiliar"
          component={ToDoFamiliar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
