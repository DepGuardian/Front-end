import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import LogoBar from "./LogoBar.jsx";
import HorizontalScroll from "./HorizontalScroll.jsx";
import HorizontalScroll2 from "./HorizontalScroll2.jsx";

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
          padding: 10,
        },
      ]}
    >
      <LogoBar />
      <View style={styles.Container}>
        <View>
          <Text
            style={[
              styles.Bold,
              {
                weidth: 333,
                height: 45,
                lineHeight: 45,
                fontWeight: "700",
                fontSize: 20,
              },
            ]}
          >
            Buenas Noches, Vale!
          </Text>
        </View>

        <View style={[styles.Pasarela, { marginTop: 0, marginBottom: 0 }]}>
          <HorizontalScroll />
        </View>
        <View style={[styles.Pasarela, { height: 80, marginTop: 0 }]}>
          <HorizontalScroll2 />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: 179,
                height: 45,
                fontSize: 20,
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: 45,
              }}
            >
              {" "}
              Acciones Rápidas
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 15,
              }}
            >
              <ICONS2 name="arrow-forward" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
