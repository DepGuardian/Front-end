import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  // Alert,
  // Image,
} from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ToDoFamiliar from "./ToDoFamiliar";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Landing = () => {
  const navigation = useNavigation();
  // const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {});

  return (
    <ImageBackground
      source={require("../assets/probb.png")}
      style={styles.general}
      resizeMethod="cover"
    >
      <View style={styles.Card}>
        <View style={styles.Logo}>
          <Text style={styles.textoLogo}>Deep Guardian</Text>
          <Text style={styles.textoLogoGrande}>Miraflores Urban</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonBlack}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.textbuttonBlack}>Sign Up</Text>
          <ICONS2 name="person" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWhite}
          onPress={() => {
            console.log("Navegando desde Landing a SignIn");
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.textbuttonWhite}>Sign in</Text>
          <ICONS name="sign-in" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonBlack,
            { marginTop: 20, backgroundColor: "#4A90E2" },
          ]}
          onPress={() => {
            navigation.navigate("ToDoFamiliar");
          }}
        >
          <Text style={styles.textbuttonBlack}>Planner Familiar</Text>
          <ICONS name="calendar" size={15} color="white" />
        </TouchableOpacity>
        <ToDoFamiliar />
      </View>
    </ImageBackground>
  );
};

export default Landing;
