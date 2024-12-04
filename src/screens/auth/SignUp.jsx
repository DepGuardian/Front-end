import React, { useState } from "react";
import { ImageBackground, View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { theme } from "../../theme";
import { storeUserData } from "../../utils/storage";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tenantId: "1",
    isSuperAdmin: false
  });

  const tenantOptions = [
    { label: "Miraflores Urban", value: "1" },
    { label: "La Florida", value: "2" },
  ];

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.179.156:7091/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);
      console.log(response);
      if (response.ok) {
        await storeUserData(
          {
            ...data.data,
            tenantId: formData.tenantId
          }
        );
        navigation.navigate("MainApp", { screen: "Pasarela" });
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
      Alert.alert(
        "Error",
        "Error de conexión. Intente más tarde",
        [{ text: "OK" }]
      );
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
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Deep Guardian</Text>
            <Text style={styles.subtitle}>Miraflores Urban</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Correo Electrónico"
              placeholder="Ingrese su email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              disabled={loading}
            />
            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
              disabled={loading}
            />
            
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Condominio</Text>
              <Picker
                selectedValue={formData.tenantId}
                onValueChange={(value) =>
                  setFormData({ ...formData, tenantId: value })
                }
                style={styles.picker}
                enabled={!loading}
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

          <View style={styles.buttonContainer}>
            <Button
              label="Regresar"
              variant="secondary"
              onPress={() => navigation.navigate("Landing")}
              icon={{
                name: "return-down-back",
                position: "left",
                family: "Ionicons",
              }}
              disabled={loading}
            />
            <Button
              label={loading ? "Cargando..." : "Ingresar"}
              variant="primary"
              onPress={handleLogin}
              icon={{ name: "sign-in", position: "right" }}
              disabled={loading}
            />
          </View>
        </View>
      </View>
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
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
  },
  subtitle: {
    ...theme.typography.h1,
  },
  form: {
    gap: theme.spacing.md,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.xl,
  },
});

export default SignUp;