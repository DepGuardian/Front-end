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

const LogoBar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.Card,
        {
          marginTop: 50,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          width: 353,
          height: 65,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "stretch",
          borderColor: "transparent",
          gap: "auto",
        },
      ]}
    >
      <View>
        <Text
          style={[
            styles.miniCardText,
            {
              width: 137,
              height: 27,
              fontSize: 20,
              fontWeight: "600",
              lineHeight: 22,
              fontStyle: "normal",
              letterSpacing: "0%",
            },
          ]}
        >
          Deep Guardian
        </Text>
      </View>

      <View
        style={[
          styles.Logo,
          {
            width: 100,
            paddingLeft: 10,
            paddingRight: 10,
            height: 45,
            marginTop: 0,
            marginBottom: 0,
            marginRight: 10,
            marginLeft: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            alignSelf: "stretch",
            gap: 20,
            borderBottomColor: "transparent",
          },
        ]}
      >
        <TouchableOpacity
          style={{
            marginLeft: 10,
            marginRight: 20,
            width: 30,
            height: 30,
            borderColor: "transparent",
            flexShrink: 0,
          }}
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <ICONS2 name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/perfil_deep_guardian.jpg")}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};
export default LogoBar;