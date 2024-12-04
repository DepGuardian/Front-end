import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import Card from "../../components/Card";
import { storeUserData } from "../../utils/storage";

const SignIn = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    apartment: "",
    tenantId: "1",
    code: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const tenantOptions = [
    { label: "Miraflores Urban", value: "1" },
    { label: "La Florida", value: "2" },
  ];

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleRegistration = async (code) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.179.156:7091/auth/registerResident",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            code: parseInt(code) ?? 0,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setShowModal(false);
        await storeUserData(
          {
            ...data.data,
            tenantId: formData.tenantId
          }
        );
        navigation.navigate("MainApp", {
          screen: "Pasarela/+",
        });
      } else {
        const errorMessage = Array.isArray(data.message) 
          ? "Por favor verifique los datos ingresados"
          : data.message || "Error en el inicio de sesión";
        
        Alert.alert(
          "Error",
          errorMessage,
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Error de conexión. Por favor intente más tarde", [
        { text: "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/probb.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.titleSmall}>Deep Guardian</Text>
            <Text style={styles.titleLarge}>Miraflores Urban</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Nombre Completo"
              placeholder="Ingrese su nombre completo"
              value={formData.fullName}
              onChangeText={(text) =>
                setFormData({ ...formData, fullName: text })
              }
            />
            <Input
              label="Email"
              placeholder="Ingrese su email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              secureTextEntry
            />
            <Input
              label="Apartamento"
              placeholder="Ingrese su número de apartamento"
              value={formData.apartment}
              onChangeText={(text) =>
                setFormData({ ...formData, apartment: text })
              }
            />
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Condominio</Text>
              <Picker
                selectedValue={formData.tenantId}
                onValueChange={(value) =>
                  setFormData({ ...formData, tenantId: value })
                }
                style={styles.picker}
              >
                {tenantOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              label="Regresar"
              variant="secondary"
              onPress={() => navigation.navigate("Landing")}
              icon={{ name: "arrow-left", position: "left" }}
              disabled={loading}
            />
            <Button
              label="Ingresar"
              variant="primary"
              onPress={handleSubmit}
              icon={{ name: "sign-in", position: "right" }}
              disabled={loading}
            />
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => !loading && setShowModal(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => !loading && setShowModal(false)}
        >
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <Card
                  navigation={navigation}
                  closeModal={() => setShowModal(false)}
                  onCodeSubmit={handleRegistration}
                  loading={loading}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  titleSmall: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#000",
  },
  titleLarge: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#000",
    marginTop: 5,
  },
  form: {
    gap: 15,
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default SignIn;
