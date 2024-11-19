import React from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./Styles";

const Card = ({ navigation, closeModal }) => {
  return (
    <View style={styles.miniCard}>
      <View style={{ width: 310, height: 82 }}>
        <Text style={[styles.miniCardText, { color: "000" }]}>
          Ingresa tu código de propietario
        </Text>
      </View>

      <View
        style={{
          width: 207,
          height: 61,
          alignItems: "center",
          marginTop: 8,
          marginBottom: 8,
          marginLeft: 50,
          marginRight: 50,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <TextInput
          style={[
            styles.input,
            {
              width: 207,
              height: 45,
              fontSize: 30,
              textAlign: "center",
              color: "262526",
              fontFamily: "Poppins",
              fontStyle: "normal",
              lineHeight: "normal",
              fontWeight: "300",
            },
          ]}
          placeholder="Ingrese su código"
          placeholderTextColor="#9F9F9F"
          textAlign="center"
          fontSize={20}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.buttonBlack,
            { width: 150, height: 50, marginBottom: 0, marginTop: 0, gap: 0 },
          ]}
          onPress={() => {
            closeModal();
            navigation.navigate("Pasarela");
          }}
        >
          <Text
            style={[
              styles.textbuttonBlack,
              {
                color: "white",
                fontWeight: "600",
                lineHeight: "normal",
                fontSize: 20,
                fontFamily: "Poppins",
                textAlign: "center",
              },
            ]}
          >
            Listo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Card;