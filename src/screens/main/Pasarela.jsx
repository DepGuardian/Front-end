import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { InfoCard } from "../../components/pasarela/InfoCard";
import { ServiceButton } from "../../components/pasarela/ServiceButton";
import PerfilBar from "../../components/common/PerfilBar";

const QuickActionCard = ({ image, description, buttonText, onPress }) => (
  <View style={styles.actionCard}>
    <Image source={image} style={styles.actionImage} />
    <View style={styles.actionContent}>
      <Text style={styles.actionText}>{description}</Text>
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Text style={styles.actionButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Pasarela = ({ navigation }) => {
  const renderQuickActions = () => {
    const actions = [
      {
        image: require("../../../assets/reserva.jpg"),
        description:
          "Aprovecha las áreas comunes de tu condominio y reserva ahora:",
        buttonText: "Ir a Reserva",
        onPress: () =>
          navigation.navigate("TabHome", {
            screen: "ReservasTab", // Aquí usamos el nombre de la tab donde está ToDoFamiliar
          }),
      },
      {
        image: require("../../../assets/paqueteria.jpg"),
        description:
          "Revisa si tus paquetes ya están disponibles en recepción:",
        buttonText: "Ir a Paquetería",
        onPress: () => {},
      },
      {
        image: require("../../../assets/pagos.jpg"),
        description:
          "Mantente informado respecto al pago de tus servicios y alquiler:",
        buttonText: "Ir a Pagos",
        onPress: () => {},
      },
    ];

    return actions.map((action, index) => (
      <QuickActionCard key={index} {...action} />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <PerfilBar />
        <View style={styles.header}>
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity> */}

          {/* Asumiendo que LogoBar es un componente funcional */}
          {/* <LogoBar /> */}
        </View>

        <Text style={styles.welcomeText}>Buenas Noches, Vale!</Text>

        <InfoCard code="P201" nextPayment="31/10" onChatPress={() => {}} />

        <View style={styles.servicesRow}>
          <ServiceButton icon="home" label="Alquiler" onPress={() => {}} />
          <ServiceButton
            icon="bulb-outline"
            label="Luz"
            family="Ionicons"
            onPress={() => {}}
          />
          <ServiceButton icon="phone" label="Celular" onPress={() => {}} />
        </View>

        <TouchableOpacity
          style={styles.plannerButton}
          onPress={() =>
            navigation.navigate("TabHome", {
              screen: "SocialTab", // Aquí usamos el nombre de la tab donde está ToDoFamiliar
            })
          }
        >
          <Text style={styles.plannerButtonText}>Planner Familiar</Text>
        </TouchableOpacity>

        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Acciones rápidas</Text>
          {renderQuickActions()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "flex-start",
    marginBottom: 20,
  },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  plannerButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  plannerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  quickActions: {
    marginTop: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 8,
    overflow: "hidden",
  },
  actionImage: {
    width: 100,
    height: 80,
    resizeMode: "cover",
  },
  actionContent: {
    flex: 1,
    padding: 10,
  },
  actionText: {
    fontSize: 14,
    marginBottom: 8,
  },
  actionButton: {
    alignSelf: "flex-start",
    backgroundColor: "#333",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default Pasarela;
