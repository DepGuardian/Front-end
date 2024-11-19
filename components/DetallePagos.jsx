import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetallePago = ({ route }) => {
  const { tipoServicio, monto, fechaVencimiento } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tipoServicio}</Text>
      <Text style={styles.label}>Monto a Pagar:</Text>
      <Text style={styles.value}>{`S/${monto}`}</Text>
      <Text style={styles.label}>Fecha de Vencimiento:</Text>
      <Text style={styles.value}>{fechaVencimiento}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default DetallePago;
