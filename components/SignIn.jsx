import React, { useState, useEffect } from "react";

import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Modal,
} from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import Card from "./Card";

const SignIn = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [codigo, setCodigo] = useState("");

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
          <Text style={styles.Bold}>Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su apellido"
            placeholderTextColor="#9F9F9F"
            secureTextEntry={false}
          />
          <Text style={styles.Bold}>Departamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su departamento"
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
            onPress={() => setShowModal(true)}
          >
            <Text style={[styles.textbuttonBlack, { marginRight: 7 }]}>
              Ingresar
            </Text>
            <ICONS name="sign-in" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <Card
            navigation={navigation}
            closeModal={() => setShowModal(false)}
          />
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default SignIn;
