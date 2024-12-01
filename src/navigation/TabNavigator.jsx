// src/navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "../screens/main/Home";
import Reservas from "../screens/features/Reservas";
import ToDoFamiliar from "../screens/features/ToDoFamiliar";
import Pasarela from "../screens/main/Pasarela";
import Pagos from "../screens/features/Pagos";
import Chats from "../screens/features/Chats";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Personaliza el tamaño del icono según la plataforma
          const iconSize = Platform.OS === "ios" ? size : size + 2;

          switch (route.name) {
            case "HomeTab":
              iconName = focused ? "home" : "home-outline";
              break;
            case "ReservasTab":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "SocialTab":
              iconName = focused ? "people" : "people-outline";
              break;
            case "NotificationsTab":
              iconName = focused ? "notifications" : "notifications-outline";
              break;
            case "MenuTab":
              iconName = focused ? "menu" : "menu-outline";
              break;
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#757575",
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        // Animación al cambiar de tab
        tabBarItemStyle: styles.tabBarItem,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Pasarela}
        options={{
          title: "Inicio",
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#000000" : "#757575" },
              ]}
            >
              Inicio
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="SocialTab"
        component={ToDoFamiliar}
        options={{
          title: "Social",
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#000000" : "#757575" },
              ]}
            >
              Social
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="ReservasTab"
        component={Reservas}
        options={{
          title: "Reservas",
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#000000" : "#757575" },
              ]}
            >
              Reservas
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={Pagos}
        options={{
          title: "Notificaciones",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#000000" : "#757575" },
              ]}
            >
              Pagos
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={ToDoFamiliar}
        options={{
          title: "Menú",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#000000" : "#757575" },
              ]}
            >
              Menú
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="ChatsTab"
        component={Chats}
        options={{
          title: "Chats",
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#000000" : "#757575" },
              ]}
            >
              Chats
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "chatbubble" : "chatbubble-outline"; // Icono de chats
            const iconSize = Platform.OS === "ios" ? size : size + 2;
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: Platform.OS === "ios" ? 85 : 65,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabBarItem: {
    paddingTop: 5,
    paddingBottom: Platform.OS === "ios" ? 0 : 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
  },
  tabBarBadge: {
    backgroundColor: "#FF3B30",
    fontSize: 10,
    fontWeight: "600",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    lineHeight: 16,
    paddingHorizontal: 4,
    textAlign: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? -2 : 2,
    right: Platform.OS === "ios" ? -6 : -4,
  },
  indicator: {
    backgroundColor: "#000000",
    height: 3,
    borderRadius: 3,
  },
});

export default TabNavigator;
