import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import Pasarela from "../screens/main/Pasarela";

const MainStack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="TabHome" component={TabNavigator} />
      <MainStack.Screen name="Pasarela" component={Pasarela} />
    </MainStack.Navigator>
  );
};
