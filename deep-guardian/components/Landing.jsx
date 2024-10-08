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
  //   const [modalConfirm, setModalConfirm] = useState(false);
  //   const [imageLoaded, setImageLoaded] = useState(false); // Estado para manejar si la imagen está cargada

  //   useEffect(() => {
  //     // Pre-cargar la imagen
  //     const imageSource = require("../assets/probb.png");
  //     Image.prefetch(imageSource)
  //       .then(() => {
  //         setImageLoaded(true);
  //         console.log("imagen precargada");
  //       })
  //       .catch((err) => console.log("Error prefetching image:", err));
  //   }, []);

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
