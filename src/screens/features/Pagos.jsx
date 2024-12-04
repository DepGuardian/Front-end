import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import PagosSim from "../../Data/PagosSim";
import { getUserData } from "../../utils/storage";

const { width } = Dimensions.get('window');

// Componente para la tarjeta de servicio
const ServiceCard = ({ service, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.serviceCard, isActive && styles.serviceCardActive]}
    onPress={onPress}
  >
    <View style={[styles.serviceIcon, isActive && styles.serviceIconActive]}>
      <Icon 
        name={service.iconName || 'cube'} 
        size={24} 
        color={isActive ? '#FFF' : '#666'} 
      />
    </View>
    <Text style={[styles.serviceName, isActive && styles.serviceNameActive]}>
      {service.nombre}
    </Text>
  </TouchableOpacity>
);

// Componente para mostrar detalles de pago
const PaymentDetail = ({ label, value, isAmount, isDate, isDue }) => (
  <View style={styles.paymentDetail}>
    <Text style={styles.paymentLabel}>{label}</Text>
    <Text style={[
      styles.paymentValue,
      isDue && { color: '#FF3B30' },
      isDate && { color: '#007AFF' }
    ]}>
      {isAmount ? `S/${value}` : value}
    </Text>
  </View>
);

const Pagos = () => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedService, setSelectedService] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);
        setData(PagosSim);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header userData={userData} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando información de pagos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header userData={userData} />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alquiler</Text>
          <View style={styles.rentCard}>
            <View style={styles.rentHeader}>
              <Icon name="home-outline" size={24} color="#007AFF" />
              <Text style={styles.rentTitle}>Pago Mensual</Text>
            </View>
            <PaymentDetail 
              label="Próximo Pago" 
              value={data.alquiler.proximoPago}
              isAmount
            />
            <PaymentDetail 
              label="Fecha de Vencimiento" 
              value={data.alquiler.fechaVencimiento}
              isDate
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {data.servicios.map((servicio, index) => (
              <ServiceCard
                key={servicio.id}
                service={servicio}
                isActive={selectedService === index}
                onPress={() => setSelectedService(index)}
              />
            ))}
          </ScrollView>

          <View style={styles.serviceDetailsCard}>
            <PaymentDetail 
              label="Precio a Pagar" 
              value={data.serviciosTotal.precio}
              isAmount
            />
            <PaymentDetail 
              label="Fecha de Vencimiento" 
              value={data.serviciosTotal.fechaVencimiento}
              isDate
            />
            <PaymentDetail 
              label="Monto de deuda" 
              value={data.serviciosTotal.deuda}
              isAmount
              isDue
            />
          </View>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Métodos de Pago</Text>
          <View style={styles.paymentMethodsGrid}>
            {['BCP', 'BBVA', 'Interbank', 'Yape'].map((bank) => (
              <TouchableOpacity 
                key={bank} 
                style={styles.paymentMethodCard}
              >
                <Text style={styles.paymentMethodText}>{bank}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  section: {
    padding: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeMoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
  rentCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  servicesContainer: {
    paddingVertical: 8,
  },
  serviceCard: {
    width: width * 0.25,
    aspectRatio: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceCardActive: {
    backgroundColor: '#007AFF',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceIconActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  serviceNameActive: {
    color: '#FFF',
  },
  serviceDetailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentLabel: {
    fontSize: 16,
    color: '#666',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  paymentMethods: {
    padding: 20,
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 12,
  },
  paymentMethodCard: {
    width: (width - 52) / 2,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default Pagos;