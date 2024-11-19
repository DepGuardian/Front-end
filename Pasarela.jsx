import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import LogoBar from "./LogoBar.jsx";

const Pasarela = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.general,
        {
          weidth: 393,
          height: 852,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          flexDirection: "column",
          justifyContent: "space-between ",
          alignItems: "stretch",
        },
      ]}
    >
      <LogoBar />

      {/* <View style={styles.Card_reservas}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <View key={index} style={styles.Card_reservas_ejemplo}>
              <Image
                source={require("../assets/probb.png")}
                style={{
                  width: 150,
                  height: 130,
                  borderRadius: 40,
                  marginRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />

              <Text
                style={[
                  styles.textbuttonWhite,
                  {
                    position: "absolute",
                    top: 15,
                    left: 170,
                    fontSize: 23,
                  },
                ]}
              >
                Salón de juegos
              </Text>
              <TouchableOpacity
                style={[
                  styles.buttonBlack_ch,
                  {
                    position: "absolute",
                    bottom: 7,
                    left: 150,
                  },
                ]}
                onPress={() => {
                  console.log("Navegando a SignIn desde Sign Up");
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.textbuttonBlack_ch}>
                  Ver disponibilidad
                </Text>
                <ICONS name="arrow-right" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Pasarela")}>
            <ICONS2 name="home-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <ICONS2 name="chatbox-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <ICONS2 name="person-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <ICONS2 name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <ICONS2 name="list-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

export default Pasarela;