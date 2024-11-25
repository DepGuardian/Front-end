import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PagosSim from "../../Data/PagosSim";
import PerfilBar from "../../components/common/PerfilBar";
const Pagos = () => {
  const [data, setData] = useState(null);

  // Simular carga de datos (como si fuera una API)
  useEffect(() => {
    setData(PagosSim); // Ya no se necesita acceder con [0]
  }, []);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PerfilBar />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alquiler </Text>
        <View style={styles.paymentDetails}>
          <Text style={styles.label}>Próximo Pago:</Text>
          <Text style={styles.value}>S/{data.alquiler.proximoPago}</Text>
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.label}>Fecha de Vencimiento:</Text>
          <Text style={styles.value}>{data.alquiler.fechaVencimiento}</Text>
        </View>
      </View>

      <Text style={styles.link}>Ver más</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servicios </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.servicesScroll}
        >
          {data.servicios.map((servicio, index) => (
            <TouchableOpacity
              key={servicio.id}
              style={[
                styles.serviceCard,
                index === 0
                  ? styles.serviceCardActive
                  : styles.serviceCardInactive,
              ]}
            >
              <Text
                style={[styles.serviceIcon, index === 0 && styles.iconActive]}
              >
                {servicio.icon}
              </Text>
              <Text
                style={[
                  styles.serviceName,
                  index === 0 && styles.serviceNameActive,
                ]}
              >
                {servicio.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.paymentDetails}>
          <Text style={styles.label}>Precio a Pagar:</Text>
          <Text style={styles.value}>S/{data.serviciosTotal.precio}</Text>
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.label}>Fecha de Vencimiento:</Text>
          <Text style={styles.value}>
            {data.serviciosTotal.fechaVencimiento}
          </Text>
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.label}>Monto de deuda:</Text>
          <Text style={styles.value}>S/{data.serviciosTotal.deuda}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginLeft: 10,
  },
  section: {
    marginVertical: 20,
  },

  paymentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  link: {
    color: "black",
    textDecorationLine: "underline",
    marginVertical: 10,
  },
  services: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  serviceButton: {
    width: "30%",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  servicesScroll: {
    width: "100%",

    marginVertical: 10,
  },
  serviceCard: {
    width: 100,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1.5,
  },
  serviceCardActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  serviceCardInactive: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  //   serviceIcon: {
  //     fontSize: 20,
  //     marginBottom: 5,
  //     color: "#ccc",
  //   },
  iconActive: {
    color: "#fff",
  },
  serviceName: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "bold",
  },
  serviceNameActive: {
    color: "#fff",
  },
});

export default Pagos;
