import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import PerfilBar from "../../components/common/PerfilBar";

// Obtén la fecha actual
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // Los meses son de 0 a 11
const currentDay = today.getDate();
const currentHour = today.getHours();
const currentMinute = today.getMinutes();

const createCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(0);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  while (days.length < 42) {
    days.push(0);
  }
  return days;
};

const getItemLayout = (data, index) => ({
  length: 50,
  offset: 50 * index,
  index,
});

const Reservas = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelection = (day) => {
    // Verifica que el día seleccionado no sea anterior a la fecha actual
    if (
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth) ||
      (selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        day < currentDay)
    ) {
      alert("No puedes seleccionar una fecha pasada.");
    } else {
      setSelectedDay(day); // Si la fecha es válida, la selecciona
    }
  };

  const handleStartHourSelection = (hour) => {
    // Si la fecha seleccionada es hoy, valida la hora
    if (
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      selectedDay === currentDay
    ) {
      const [hourStr, period] = hour.split(" ");
      const [hourNum, minuteNum] = hourStr.split(":").map(Number);
      const hour24 = period === "PM" && hourNum !== 12 ? hourNum + 12 : hourNum; // Convierte a formato 24 horas

      if (
        hour24 < currentHour ||
        (hour24 === currentHour && minuteNum < currentMinute)
      ) {
        alert("No puedes seleccionar una hora pasada.");
        return;
      }
    }

    setSelectedStartHour(hour); // Si la hora es válida, la selecciona
  };

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() - index
  );

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenDateModal = () => {
    setModalVisible(false);
    setDateModalVisible(true);
  };

  const handleCloseDateModal = () => {
    setDateModalVisible(false);
  };

  const handleSelectDate = () => {
    if (selectedDay && selectedMonth !== null && selectedYear !== null) {
      setSelectedDate(
        `${selectedDay} de ${months[selectedMonth]} del ${selectedYear}`
      );
      handleCloseDateModal();
    } else {
      alert("Por favor selecciona un día, mes y año.");
    }
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const handleCloseEndHourModal = () => {
    setEndHourModalVisible(false);
    setConfirmationModalVisible(true);

    // Oculta el modal de confirmación después de 3 segundos
    setTimeout(() => setConfirmationModalVisible(false), 3000);
  };
  const hours = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
  ];
  const [startHourModalVisible, setStartHourModalVisible] = useState(false);
  const [endHourModalVisible, setEndHourModalVisible] = useState(false);
  const [selectedStartHour, setSelectedStartHour] = useState("08:00 AM");
  const [selectedEndHour, setSelectedEndHour] = useState("09:00 AM");
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const infiniteHours = [...hours, ...hours, ...hours];
  const middleIndex = hours.length;
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Verificamos si la referencia está disponible antes de usar scrollToIndex
    if (!startHourRef.current) return;

    // Si el usuario llega al final, reseteamos al inicio
    if (offsetY >= contentHeight - layoutHeight - 50) {
      startHourRef.current.scrollToIndex({
        index: middleIndex,
        animated: false,
      });
    }

    // Si el usuario llega al inicio, reseteamos al centro
    if (offsetY <= 50) {
      startHourRef.current.scrollToIndex({
        index: middleIndex,
        animated: false,
      });
    }
  };
  const startHourRef = useRef(null);
  const endHourRef = useRef(null);
  useEffect(() => {
    if (startHourRef.current) {
      setTimeout(() => {
        try {
          startHourRef.current.scrollToIndex({
            index: middleIndex,
            animated: false,
          });
        } catch (error) {
          console.warn("Error during scrollToIndex in useEffect:", error);
        }
      }, 0);
    }
  }, [middleIndex]);

  const renderTimeOption = (hour, setSelectedHour) => (
    <TouchableOpacity
      style={[
        { height: 50, justifyContent: "center", alignItems: "center" },
        styles.itemContainer,
        (hour === selectedStartHour || hour === selectedEndHour) &&
          styles.selectedItem,
      ]}
      onPress={() => setSelectedHour(hour)}
    >
      <Text style={styles.itemText}>{hour}</Text>
    </TouchableOpacity>
  );

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  return (
    <View style={styles.container}>
      <PerfilBar />

      <View style={styles.nombre_pag}>
        <Text
          style={[
            styles.textbuttonWhite,
            {
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: 24,
              fontWeight: "900",
            },
          ]}
        >
          Reserva un área común
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{ left: 290, top: 13 }}
        >
          <ICONS2 name="ticket-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={[styles.Card_reservas, { height: 645 }]}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <View key={index} style={styles.Card_reservas_ejemplo}>
              <Image
                source={require("../../../assets/sala_juegos.jpg")}
                style={{
                  width: 150,
                  height: 130,
                  borderRadius: 40,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <Text
                style={[
                  styles.textbuttonWhite,
                  {
                    position: "absolute",
                    top: 4,
                    left: 170,
                    fontSize: 23,
                  },
                ]}
              >
                Salón de juegos
              </Text>
              <TouchableOpacity
                style={[
                  styles.buttonBlack_ch,
                  {
                    position: "absolute",
                    bottom: 7,
                    left: 150,
                  },
                ]}
                onPress={handleOpenModal}
              >
                <Text style={styles.textbuttonBlack_ch}>
                  Ver disponibilidad
                </Text>
                <ICONS name="arrow-right" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Modal de disponibilidad */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={require("../../../assets/sala_juegos.jpg")}
                style={styles.modalImage}
              />
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Estado actual:</Text>
                <Text>Reservado</Text>
                <Text style={styles.boldText}> Capacidad:</Text>
                <Text>100</Text>
              </View>
              <Text style={styles.modalText}>
                Área recreativa en el que varias personas pueden entrar...
              </Text>
              <TouchableOpacity
                onPress={handleOpenDateModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de fecha */}
        <Modal
          transparent={true}
          visible={dateModalVisible}
          animationType="fade"
          onRequestClose={handleCloseDateModal}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: "80%" }]}>
              <Text style={styles.boldText}>Seleccionar Fecha</Text>
              <View style={styles.dateSelectionRow}>
                <TouchableOpacity onPress={handlePrevYear}>
                  <Text style={styles.arrowButton}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.label}>
                  {months[selectedMonth]} {selectedYear}
                </Text>
                <TouchableOpacity onPress={handleNextYear}>
                  <Text style={styles.arrowButton}>{">"}</Text>
                </TouchableOpacity>
                <Text>{"                        "}</Text>
                <TouchableOpacity onPress={handlePrevMonth}>
                  <Text style={styles.arrowButton}>{"<"}</Text>
                </TouchableOpacity>
                <Text>{"  "}</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                  <Text style={styles.arrowButton}>{">"}</Text>
                </TouchableOpacity>
              </View>

              {/* Días de la semana en una fila */}
              <View
                style={[
                  styles.weekDaysRow,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
                  (day, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.weekDayText,
                        { flex: 1, textAlign: "center" },
                      ]}
                    >
                      {day}
                    </Text>
                  )
                )}
              </View>

              <FlatList
                data={createCalendar(selectedYear, selectedMonth)} // Los días generados
                numColumns={7} // 7 columnas para los días de la semana
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      item === selectedDay && { backgroundColor: "#d7feff" },
                    ]} // Cambia el fondo si es seleccionado
                    onPress={() => item !== 0 && handleDaySelection(item)} // Solo selecciona los días válidos (no 0)
                  >
                    {item !== 0 && (
                      <Text
                        style={[
                          styles.itemText,
                          item === selectedDay && {
                            color: "#00cbd1",
                            fontSize: 24,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
              />

              {/* Botón para confirmar la selección */}
              <TouchableOpacity
                onPress={() => {
                  setDateModalVisible(false);
                  setStartHourModalVisible(true);
                }}
                style={styles.selectButton}
              >
                <Text style={styles.selectButtonText}>Horario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de hora de inicio */}
        <Modal visible={startHourModalVisible} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.timeModalTitle}>
                Seleccione la hora de inicio
              </Text>

              <View style={{ height: 150 }}>
                <FlatList
                  ref={startHourRef}
                  data={infiniteHours}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                    renderTimeOption(item, handleStartHourSelection)
                  }
                  getItemLayout={getItemLayout}
                  initialScrollIndex={middleIndex} // Empezamos en el centro
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  snapToAlignment="center"
                  decelerationRate="fast"
                  pagingEnabled
                  contentContainerStyle={{ paddingVertical: 50 }}
                  onScroll={handleScroll} // Detecta cuando reiniciar el scroll
                  scrollEventThrottle={16} // Ajusta la frecuencia de evento de scroll para rendimiento
                />
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setStartHourModalVisible(false);
                  setEndHourModalVisible(true);
                }}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para el selector de hora de fin */}
        <Modal visible={endHourModalVisible} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.timeModalTitle}>
                Seleccione la hora de fin
              </Text>

              <View style={{ height: 150 }}>
                <FlatList
                  ref={endHourRef}
                  data={infiniteHours}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                    renderTimeOption(item, setSelectedEndHour)
                  }
                  getItemLayout={getItemLayout}
                  initialScrollIndex={middleIndex} // Empezamos en el centro
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  snapToAlignment="center"
                  decelerationRate="fast"
                  pagingEnabled
                  contentContainerStyle={{ paddingVertical: 50 }}
                  onScroll={handleScroll} // Detecta cuando reiniciar el scroll
                  scrollEventThrottle={16} // Ajusta la frecuencia de evento de scroll para rendimiento
                />
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseEndHourModal}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de confirmación de reserva */}
        <Modal
          visible={confirmationModalVisible}
          animationType="fade"
          transparent
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.timeModalTitle}>¡Reserva registrada!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  general: {
    flex: 1,
  },
  logo_deep_foto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 25,
  },
  nombre_pag: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  Card_reservas: {
    flex: 1,
    paddingHorizontal: 15,
  },
  Card_reservas_ejemplo: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonBlack_ch: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textbuttonBlack_ch: {
    color: "white",
    fontSize: 12,
  },
  textbuttonWhite: {
    color: "black",
    marginRight: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  // Estilos para los modales
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  boldText: {
    fontWeight: "bold", // texto en negrita
    fontSize: 14,
    marginRight: 5,
  },
  modalText: {
    textAlign: "center",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#00cbd1",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateSelectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  arrowButton: {
    fontSize: 24,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  weekDayText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    width: 29, // Ancho fijo para el botón del día
    height: 29, // Alto fijo para el botón del día
    margin: 8, // Espacio entre los botones
    borderWidth: 1, // Borde fijo
    borderColor: "white", // Color del borde
    borderRadius: 5, // Bordes redondeados
    alignItems: "center", // Centrado del contenido
    justifyContent: "center", // Centrado vertical
    backgroundColor: "#f4f4f4", // Color de fondo por defecto
  },
  itemText: {
    fontSize: 20,
  },
  selectButton: {
    backgroundColor: "#00cbd1",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#d7feff",
  },
});

export default Reservas;
