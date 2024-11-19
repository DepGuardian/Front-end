import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ICONS3 from "react-native-vector-icons/Ionicons";

import LogoBar from "./LogoBar";

const Pasarela = () => {
  const navigation = useNavigation();

  const navigateToPlanner = () => {
    navigation.navigate("ToDoFamiliar");
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ICONS3 name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <LogoBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Buenas Noches, Vale!</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>P201</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Próximo Pago: 31/10</Text>
          </View>
          <TouchableOpacity style={styles.infoBox}>
            <Text style={styles.infoText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botones de Servicios */}
      <View style={styles.servicesRow}>
        <TouchableOpacity style={styles.serviceButton}>
          <ICONS name="home" size={20} color="black" />
          <Text style={styles.serviceText}>Alquiler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceButton}>
          <ICONS2 name="bulb-outline" size={20} color="black" />
          <Text style={styles.serviceText}>Luz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceButton}>
          <ICONS name="phone" size={20} color="black" />
          <Text style={styles.serviceText}>Celular</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Planner Familiar */}
      <TouchableOpacity
        style={styles.plannerButton}
        onPress={navigateToPlanner}
      >
        <Text style={styles.plannerButtonText}>Planner Familiar</Text>
      </TouchableOpacity>

      {/* Acciones Rápidas */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Acciones rápidas</Text>
        <View style={styles.actionCard}>
          <Image
            source={require("../assets/reserva.jpg")}
            style={styles.actionImage}
          />
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>
              Aprovecha las áreas comunes de tu condominio y reserva ahora:
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Ir a Reserva</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionCard}>
          <Image
            source={require("../assets/paqueteria.jpg")}
            style={styles.actionImage}
          />
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>
              Revisa si tus paquetes ya están disponibles en recepción:
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Ir a Paquetería</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionCard}>
          <Image
            source={require("../assets/pagos.jpg")}
            style={styles.actionImage}
          />
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>
              Mantente informado respecto al pago de tus servicios y alquiler:
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Ir a Pagos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerInner: {
    padding: 20,
  },
  greetingText: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20,
  },
  pasarelaSection: {
    marginTop: 0,
    marginBottom: 20,
  },
  quickActionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickActionsText: {
    fontSize: 20,
    fontWeight: "700",
  },
  arrowButton: {
    marginLeft: 15,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  infoBox: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
  },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  serviceButton: {
    alignItems: "center",
  },
  serviceText: {
    fontSize: 14,
    marginTop: 5,
  },
  plannerButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  plannerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  quickActions: {
    padding: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
  },
  actionImage: {
    width: 100,
    height: 80,
  },
  actionContent: {
    flex: 1,
    padding: 10,
  },
  actionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  actionButton: {
    alignSelf: "flex-start",
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default Pasarela;
