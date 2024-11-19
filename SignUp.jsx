import React, { useState, useEffect } from "react";

import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Image,
} from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";

const SignUp = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/probb.png")}
      style={styles.general}
      resizeMethod="cover"
    >
      <View style={[styles.Card, { height: 504 }]}>
        <View style={[styles.Logo, { marginTop: 100 }]}>
          <Text style={styles.textoLogo}>Deep Guardian</Text>
          <Text style={styles.textoLogoGrande}>Miraflores Urban</Text>
        </View>
        <View style={[styles.CardForms, { gap: 10 }]}>
          <Text style={styles.Bold}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su Nombre"
            placeholderTextColor="#9F9F9F"
          />
          <Text style={styles.Bold}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su email"
            placeholderTextColor="#9F9F9F"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.BottomButtons}>
          <TouchableOpacity
            style={styles.buttonWhite}
            onPress={() => navigation.navigate("Landing")}
          >
            <ICONS2 name="return-down-back" size={15} color="black" />
            <Text style={[styles.textbuttonWhite, { marginLeft: 7 }]}>
              Regresar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBlack}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={[styles.textbuttonBlack, { marginRight: 7 }]}>
              Ingresar
            </Text>
            <ICONS name="sign-in" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUp;