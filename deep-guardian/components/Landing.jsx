import React, { useState, useEffect } from "react"; // Importar correctamente React
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Landing = () => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

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
            console.log("Navegando a SignIn desde Sign Up");
            // console.log("imageLoaded: ", imageLoaded);
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.textbuttonBlack}>Sign Up</Text>
          <ICONS2 name="person" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWhite}
          onPress={() => {
            console.log("Navegando a SignIn desde Sign Up");
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.textbuttonWhite}>Sign in</Text>
          <ICONS name="sign-in" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Landing;
