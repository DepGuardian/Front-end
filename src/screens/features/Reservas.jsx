import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { getUserData } from '../../utils/storage';

const API_URL = 'http://192.168.179.156:7091';

// Componente para mostrar un área común
const CommonAreaCard = ({ area, onSelect, isSelected }) => (
  <TouchableOpacity 
    style={[styles.areaCard, isSelected && styles.areaCardSelected]}
    onPress={() => onSelect(area)}
  >
    <View style={styles.areaIcon}>
      <Icon 
        name={area.name.toLowerCase().includes('juego') ? 'game-controller' : 'business'} 
        size={24} 
        color={isSelected ? '#FFF' : '#007AFF'} 
      />
    </View>
    <View style={styles.areaInfo}>
      <Text style={[styles.areaName, isSelected && styles.areaNameSelected]}>
        {area.name}
      </Text>
      <Text style={[styles.areaDescription, isSelected && styles.areaDescriptionSelected]}>
        {area.description}
      </Text>
      <View style={styles.areaCapacity}>
        <Icon 
          name="people" 
          size={16} 
          color={isSelected ? '#FFF' : '#666'} 
        />
        <Text style={[styles.capacityText, isSelected && styles.capacityTextSelected]}>
          Capacidad: {area.capacity} personas
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Componente para mostrar una reserva existente
const ReservationCard = ({ reservation, onCancel, commonAreas }) => {
  const area = commonAreas.find(a => a._id === reservation.id_common_area);
  const startTime = new Date(reservation.time_interval.start);
  const endTime = new Date(reservation.time_interval.end);

  return (
    <View style={styles.reservationCard}>
      <View style={styles.reservationHeader}>
        <Text style={styles.reservationAreaName}>{area?.name}</Text>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => onCancel(reservation)}
        >
          <Icon name="close-circle" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      <View style={styles.reservationTime}>
        <Icon name="time-outline" size={20} color="#666" />
        <Text style={styles.timeText}>
          {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
          {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <Text style={styles.reservationDate}>
        {startTime.toLocaleDateString()}
      </Text>
    </View>
  );
};

const ReservationsScreen = () => {
  const [userData, setUserData] = useState(null);
  const [commonAreas, setCommonAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const user = await getUserData();
      setUserData(user);
      await Promise.all([
        fetchCommonAreas(user.tenantId),
        fetchReservations(user.tenantId)
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert('Error', 'No se pudo cargar la información inicial');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommonAreas = async (tenantId) => {
    try {
      const response = await fetch(`${API_URL}/commonarea/all?tenantId=${tenantId}`);
      const data = await response.json();
      if (data.status === 200) {
        setCommonAreas(data.data);
      }
    } catch (error) {
      console.error('Error fetching common areas:', error);
      Alert.alert('Error', 'No se pudieron cargar las áreas comunes');
    }
  };

  const fetchReservations = async (tenantId) => {
    try {
      const response = await fetch(`${API_URL}/reservation?tenantId=${tenantId}`);
      const data = await response.json();
      if (data.status === 200) {
        setReservations(data.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      Alert.alert('Error', 'No se pudieron cargar las reservas');
    }
  };

  const handleReservation = async () => {
    if (!selectedArea) {
      Alert.alert('Error', 'Por favor seleccione un área común');
      return;
    }

    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
    
    const endDateTime = new Date(selectedDate);
    endDateTime.setHours(selectedEndTime.getHours(), selectedEndTime.getMinutes());

    if (endDateTime <= startDateTime) {
      Alert.alert('Error', 'La hora de fin debe ser posterior a la hora de inicio');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          id_common_area: selectedArea._id,
          id_host: userData._id,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          tenantId: userData.tenantId
        })
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Reserva creada correctamente');
        await fetchReservations(userData.tenantId);
        setSelectedArea(null);
      } else {
        throw new Error('Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      Alert.alert('Error', 'No se pudo crear la reserva');
    }
  };

  const handleCancelReservation = async (reservation) => {
    Alert.alert(
      'Cancelar Reserva',
      '¿Está seguro que desea cancelar esta reserva?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/reservation`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json'
                },
                body: JSON.stringify({
                  id: reservation._id,
                  tenantId: userData.tenantId
                })
              });

              if (response.ok) {
                await fetchReservations(userData.tenantId);
                Alert.alert('Éxito', 'Reserva cancelada correctamente');
              } else {
                throw new Error('Error al cancelar la reserva');
              }
            } catch (error) {
              console.error('Error canceling reservation:', error);
              Alert.alert('Error', 'No se pudo cancelar la reserva');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header userData={userData} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando reservas...</Text>
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
          <Text style={styles.sectionTitle}>Áreas Comunes</Text>
          {commonAreas.map(area => (
            <CommonAreaCard
              key={area._id}
              area={area}
              onSelect={setSelectedArea}
              isSelected={selectedArea?._id === area._id}
            />
          ))}
        </View>

        {selectedArea && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nueva Reserva</Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowStartPicker(true)}
              >
                <Icon name="calendar-outline" size={24} color="#007AFF" />
                <Text style={styles.dateTimeText}>
                  {selectedDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              <View style={styles.timePickersContainer}>
                <TouchableOpacity 
                  style={styles.timePickerButton}
                  onPress={() => setShowStartPicker(true)}
                >
                  <Icon name="time-outline" size={24} color="#007AFF" />
                  <Text style={styles.dateTimeText}>
                    {selectedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.timeSeperator}>hasta</Text>

                <TouchableOpacity 
                  style={styles.timePickerButton}
                  onPress={() => setShowEndPicker(true)}
                >
                  <Icon name="time-outline" size={24} color="#007AFF" />
                  <Text style={styles.dateTimeText}>
                    {selectedEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.reserveButton}
                onPress={handleReservation}
              >
                <Icon name="calendar-check" size={24} color="#FFF" />
                <Text style={styles.reserveButtonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ocupados</Text>
          {reservations.length > 0 ? (
            reservations.map(reservation => (
              <ReservationCard
                key={reservation._id}
                reservation={reservation}
                onCancel={handleCancelReservation}
                commonAreas={commonAreas}
              />
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <Icon name="calendar-outline" size={48} color="#CCC" />
              <Text style={styles.emptyStateText}>No hay reservas</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {(showStartPicker || showEndPicker) && (
        <DateTimePicker
          value={showStartPicker ? selectedStartTime : selectedEndTime}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            if (Platform.OS === 'android') {
              setShowStartPicker(false);
              setShowEndPicker(false);
            }
            if (selectedTime) {
              if (showStartPicker) {
                setSelectedStartTime(selectedTime);
                setShowStartPicker(false);
                setShowEndPicker(true);
              } else {
                setSelectedEndTime(selectedTime);
                setShowEndPicker(false);
              }
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
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
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  // Estilos para las tarjetas de áreas comunes
  areaCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  areaCardSelected: {
    backgroundColor: '#007AFF',
  },
  areaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  areaNameSelected: {
    color: '#FFF',
  },
  areaDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  areaDescriptionSelected: {
    color: '#FFF',
  },
  areaCapacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  capacityTextSelected: {
    color: '#FFF',
  },
  // Estilos para la sección de fecha y hora
  dateTimeContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  timePickersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timePickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 12,
  },
  timeSeperator: {
    marginHorizontal: 12,
    color: '#666',
    fontSize: 14,
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Estilos para las tarjetas de reserva
  reservationCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reservationAreaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelButton: {
    padding: 4,
  },
  reservationTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  reservationDate: {
    fontSize: 14,
    color: '#666',
  },
  // Estilos para el estado vacío
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  // Estilos para los pickers de iOS
  pickerIOS: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pickerHeaderIOS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  pickerHeaderTextIOS: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerDoneButtonIOS: {
    color: '#007AFF',
    fontSize: 16,
  },
  // Estilos adicionales para estados de interacción
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  successText: {
    color: '#34C759',
    fontSize: 14,
    marginTop: 4,
  },
  warningBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});