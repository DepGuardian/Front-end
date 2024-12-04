import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import { getUserData } from "../../utils/storage";
import { getGreeting } from "../../utils/greetings";

const { width } = Dimensions.get('window');

const QuickActionCard = ({ icon, title, description, buttonText, onPress, color = "#007AFF" }) => (
  <TouchableOpacity 
    style={[styles.actionCard, { borderLeftColor: color }]}
    onPress={onPress}
  >
    <View style={styles.actionIcon}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <View style={styles.actionContent}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDescription}>{description}</Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

const ServiceCard = ({ icon, label, amount, date, color = "#007AFF" }) => (
  <View style={styles.serviceCard}>
    <View style={styles.serviceHeader}>
      <View style={[styles.serviceIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.serviceLabel}>{label}</Text>
    </View>
    <Text style={styles.serviceAmount}>{amount}</Text>
    <Text style={styles.serviceDate}>{date}</Text>
  </View>
);

const Pasarela = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const loadUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    loadUserData();
  
    // Actualizamos el saludo cada minuto para mantenerlo sincronizado
    const intervalId = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const quickActions = [
    {
      icon: "calendar",
      title: "Reservas",
      description: "Reserva áreas comunes del condominio",
      buttonText: "Reservar",
      onPress: () => navigation.navigate("MainApp", { screen: "ReservasTab" }),
      color: "#007AFF",
    },
    {
      icon: "cube",
      title: "Paquetería",
      description: "Revisa tus paquetes en recepción",
      buttonText: "Ver paquetes",
      onPress: () => navigation.navigate("MainApp", { screen: "NotificationsTab" }),
      color: "#FF9500",
    },
    {
      icon: "wallet",
      title: "Pagos",
      description: "Gestiona tus pagos de servicios",
      buttonText: "Ver pagos",
      onPress: () => navigation.navigate("MainApp", { screen: "NotificationsTab" }),
      color: "#34C759",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header userData={userData} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTime}>{greeting},</Text>
          <Text style={styles.welcomeName}>
            {userData ? userData.fullName.split(' ')[0] : "..."}
          </Text>
        </View>

        <View style={styles.apartmentCard}>
          <View style={styles.apartmentInfo}>
            <Text style={styles.apartmentCode}>{userData ? userData.apartment : "..."}</Text>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentLabel}>Próximo Pago:</Text>
              <Text style={styles.paymentDate}>31/10</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => navigation.navigate("MainApp", { screen: "ChatsTab" })}
          >
            <Icon name="chatbubbles-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            <ServiceCard 
              icon="home" 
              label="Alquiler" 
              amount="S/790.00"
              date="Vence: 31/10"
              color="#007AFF"
            />
            <ServiceCard 
              icon="flash" 
              label="Luz" 
              amount="S/120.00"
              date="Vence: 15/10"
              color="#FF9500"
            />
            <ServiceCard 
              icon="water" 
              label="Agua" 
              amount="S/45.00"
              date="Vence: 20/10"
              color="#34C759"
            />
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.plannerButton}
          onPress={() => navigation.navigate("MainApp", { screen: "SocialTab" })}
        >
          <Icon name="calendar-outline" size={24} color="#FFF" />
          <Text style={styles.plannerButtonText}>Planner Familiar</Text>
        </TouchableOpacity>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Acciones rápidas</Text>
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
  },
  welcomeTime: {
    fontSize: 16,
    color: "#666",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  apartmentCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  apartmentInfo: {
    flex: 1,
  },
  apartmentCode: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentLabel: {
    color: "#666",
    marginRight: 4,
  },
  paymentDate: {
    fontWeight: "600",
    color: "#007AFF",
  },
  chatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  servicesSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  servicesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  serviceCard: {
    width: width * 0.4,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  serviceLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  serviceAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 12,
    color: "#666",
  },
  plannerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  plannerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default Pasarela;