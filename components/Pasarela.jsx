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
import ToDoFamiliar from "./ToDoFamiliar";
import LogoBar from "./LogoBar";
import HorizontalScroll from "./HorizontalScroll.jsx";
import HorizontalScroll2 from "./HorizontalScroll2.jsx";
import ActionsList from "./ActionsList.jsx";

const Pasarela = () => {
  const navigation = useNavigation();

  const navigateToPlanner = () => {
    navigation.navigate("ToDoFamiliar");
  };

  return (
<<<<<<< HEAD
    <ScrollView style={styles.container}>
=======
    <View
      style={[
        styles.general,
        {
          weidth: 393,
          height: 852,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          flexDirection: "column",
          justifyContent: "space-between ",
          alignItems: "stretch",
          padding: 10,
        },
      ]}
    >
>>>>>>> efb149921fa8b8f6391d6160ea818e30c52a1a34
      <LogoBar />
      <View style={styles.Container}>
        <View>
          <Text
            style={[
              styles.Bold,
              {
                weidth: 333,
                height: 45,
                lineHeight: 45,
                fontWeight: "700",
                fontSize: 20,
              },
            ]}
          >
            Buenas Noches, Vale!
          </Text>
        </View>

        <View style={[styles.Pasarela, { marginTop: 0, marginBottom: 0 }]}>
          <HorizontalScroll />
        </View>
        <View style={[styles.Pasarela, { height: 80, marginTop: 0 }]}>
          <HorizontalScroll2 />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: 179,
                height: 45,
                fontSize: 20,
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: 45,
              }}
            >
              Acciones Rápidas
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 15,
              }}
            >
              <ICONS2 name="arrow-forward" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <ActionsList />
        </View>
      </View>

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
