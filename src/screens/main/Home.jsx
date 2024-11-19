import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from "react-native";
import styles from "../../components/Styles";

const Home = ({ navigation }) => {
  return (
    <View style={styles.miniCard}>
      <View style={{ width: 310, height: 82 }}>
        <Text style={styles.miniCardText}>
          Ingresa tu código de propietario
        </Text>
      </View>

      <View style={{ width: 207, height: 61, alignItems: "center" }}>
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
          style={styles.buttonBlack}
          onPress={() => navigation.navigate("Validation")}
        >
          <Text style={styles.textbuttonBlack}>Listo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;