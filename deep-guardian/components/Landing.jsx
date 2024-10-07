import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";

const Landing = () => {
  return (
    <ImageBackground
      source={require("../assets/probb.png")}
      style={styles.general}
      resizeMethod="cover"
    >
      {/* <View style={styles.general}> */}
      <View style={styles.Card1}>
        <View style={styles.Logo}>
          <Text style={styles.textoLogo}>Deep Guardian</Text>
          <Text style={styles.textoLogoGrande}>Miraflores Urban</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonBlack}
          onPress={() => Alert.alert("Sign up")}
        >
          <Text style={styles.textbutBlack}>Sign Up</Text>
          <ICONS2 name="person" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWhite}
          onPress={() => Alert.alert("Sign in")}
        >
          <Text style={styles.textbutWhite}>Sign in</Text>
          <ICONS name="sign-in" size={15} color="black" />
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "80%",
  },
  general: {
    flex: 1,
    width: 393,
    height: 852,
    // height: "100%",
    marginTop: 50,

    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 50,
    gap: 10,
    color: "white",
    backgroundColor: "white",
    flexShrink: 0,
  },
  Card1: {
    width: 393,
    height: 370,
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderWidth: 0.7,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // alignSelf: "stretch",
    backgroundColor: "white",
  },
  Logo: {
    width: 333,
    height: 133,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 10,
    alignSelf: "stretch",
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
  },
  buttonBlack: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 10,
  },
  buttonWhite: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textbutBlack: {
    font: 20,
    color: "white",
    marginRight: 5,
  },
  textbutWhite: {
    font: 20,
    color: "black",
    marginRight: 5,
  },
  textoLogo: {
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 41,
    letterSpacing: 0.4,
  },
  textoLogoGrande: {
    alignSelf: "stretch",
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 50,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 50,
    letterSpacing: 0.4,
  },
});

export default Landing;
