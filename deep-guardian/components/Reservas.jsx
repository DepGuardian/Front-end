import React, { useState, useRef,useEffect  } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles.js";

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

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

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
      setSelectedDate(`${selectedDay} de ${months[selectedMonth]} del ${selectedYear}`);
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
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM",
    "11:00 PM", "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM",
    "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM"
  ];
  const [startHourModalVisible, setStartHourModalVisible] = useState(false);
  const [endHourModalVisible, setEndHourModalVisible] = useState(false);
  const [selectedStartHour, setSelectedStartHour] = useState("08:00 AM");
  const [selectedEndHour, setSelectedEndHour] = useState("09:00 AM");
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const infiniteHours = [...hours, ...hours, ...hours];
  const middleIndex = hours.length;
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Si el usuario llega al final, reseteamos al inicio
    if (offsetY >= contentHeight - layoutHeight - 50) {
      startHourRef.current.scrollToIndex({ index: middleIndex, animated: false });
    }
    // Si el usuario llega al inicio, reseteamos al centro
    if (offsetY <= 50) {
      startHourRef.current.scrollToIndex({ index: middleIndex, animated: false });
    }
  };
  const startHourRef = useRef(null);
  const endHourRef = useRef(null);
  useEffect(() => {
    // Al montar el componente, scrolleamos al centro para dar la impresión de scroll infinito
    if (startHourRef.current) {
      startHourRef.current.scrollToIndex({ index: middleIndex, animated: false });
    }
  }, []);



  const renderTimeOption = (hour, setSelectedHour) => (
    <TouchableOpacity
      style={[
        { height: 50, justifyContent: "center", alignItems: "center" },
        styles.itemContainer,
        (hour === selectedStartHour || hour === selectedEndHour) && styles.selectedItem
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
    <View style={[styles.general, { backgroundColor: "white" }]}>
      <View style={[styles.logo_deep_foto, { top: -5, zIndex: 2 }]}>
        <Text
          style={[
            styles.textbuttonWhite,
            {
              position: "absolute",
              left: 15,
              fontSize: 21,
              fontWeight: "700",
              zIndex: 2,
            },
          ]}
        >
          DepGuardian
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={{ left: -20, marginTop: 0 }}>
          <ICONS2 name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/perfil_deep_guardian.jpg")}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: -280 }}
        />
      </View>

      <View style={styles.nombre_pag}>
        <Text
          style={[
            styles.textbuttonWhite,
            {
              position: "absolute",
              top: 70,
              left: 10,
              fontSize: 24,
              fontWeight: "900",
            },
          ]}
        >
          Reserva un área común
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={{ left: 160, top: 55 }}>
          <ICONS2 name="ticket-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={[styles.Card_reservas, { height: 645 }]}>
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
          {Array.from({ length: 10 }).map((_, index) => (
            <View key={index} style={styles.Card_reservas_ejemplo}>
              <Image
                source={require("../assets/sala_juegos.jpg")}
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
                <Text style={styles.textbuttonBlack_ch}>Ver disponibilidad</Text>
                <ICONS name="arrow-right" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

         {/* Modal de disponibilidad */}
         <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={handleCloseModal}>
          <View style={styles.modalStyles.overlay}>
            <View style={styles.modalStyles.modalContent}>
              <Image source={require("../assets/sala_juegos.jpg")} style={styles.modalStyles.modalImage} />
              <View style={styles.modalStyles.infoRow}>
                <Text style={styles.modalStyles.boldText}>Estado actual:</Text>
                <Text>Reservado</Text>
                <Text style={styles.modalStyles.boldText}>  Capacidad:</Text>
                <Text>100</Text>
              </View>
              <Text style={styles.modalStyles.modalText}>Área recreativa en el que varias personas pueden entrar...</Text>

              {/* Botón para abrir el modal de selección de fecha */}
              <TouchableOpacity onPress={handleOpenDateModal} style={styles.modalStyles.closeButton}>
                <Text style={styles.modalStyles.closeButtonText}>Reservar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        <Modal transparent={true} visible={dateModalVisible} animationType="fade" onRequestClose={handleCloseDateModal}>
          <View style={styles.modalStyles.overlay}>
            <View style={[styles.modalStyles.modalContent, { maxHeight: "80%" }]}>
            <Text style={styles.modalStyles.boldText}>Seleccionar Fecha</Text>

      {/* Selector de Año y Mes en una sola línea */}
      <View style={[styles.dateSelectionRow, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
        <TouchableOpacity onPress={handlePrevYear}>
          <Text style={styles.modalStyles.arrowButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.modalStyles.label}>
          {months[selectedMonth]} {selectedYear}
        </Text>
        <TouchableOpacity onPress={handleNextYear}>
          <Text style={styles.modalStyles.arrowButton}>{">"}</Text>
        </TouchableOpacity>
        <Text>{"                        "}</Text>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.modalStyles.arrowButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text>{"        "}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.modalStyles.arrowButton}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Días de la semana en una fila */}
      <View style={[styles.weekDaysRow, { flexDirection: "row", justifyContent: "space-between" }]}>
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, index) => (
          <Text key={index} style={[styles.weekDayText, { flex: 1, textAlign: "center" }]}>{day}</Text>
        ))}
      </View>

      <FlatList
          data={createCalendar(selectedYear, selectedMonth)} // Los días generados
          numColumns={7} // 7 columnas para los días de la semana
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.modalStyles.item, item === selectedDay && { backgroundColor: "#d7feff" }]} // Cambia el fondo si es seleccionado
              onPress={() => item !== 0 && setSelectedDay(item) } // Solo selecciona los días válidos (no 0)
            >
              {item !== 0 && <Text style={[styles.modalStyles.itemText,item === selectedDay && { color: "#00cbd1" ,fontSize:20,fontWeight: "bold",}]}>{item}</Text>}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
       />


      {/* Botón para confirmar la selección */}
      <TouchableOpacity onPress={() => {
            setDateModalVisible(false); // Cierra el modal de fecha
            setStartHourModalVisible(true); // Abre el modal de selección de hora de inicio
          }}style={styles.modalStyles.selectButton}>
        <Text style={styles.modalStyles.selectButtonText}>Horario</Text>
      </TouchableOpacity>

    
    </View>
  </View>
</Modal>


 {/* Modal para el selector de hora de inicio */}
 <Modal visible={startHourModalVisible} animationType="fade" transparent>
        <View style={styles.modalStyles.overlay}>
          <View style={styles.modalStyles.modalContent}>
            <Text style={styles.modalStyles.timeModalTitle}>Seleccione la hora de inicio</Text>

              <View style={{ height: 150 }}>
                <FlatList
                  ref={startHourRef}
                  data={infiniteHours}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderTimeOption(item, setSelectedStartHour)}
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
              style={styles.modalStyles.closeButton}
              onPress={() => {
                setStartHourModalVisible(false);
                setEndHourModalVisible(true); 
              }}
            >
              <Text style={styles.modalStyles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para el selector de hora de fin */}
      <Modal visible={endHourModalVisible} animationType="fade" transparent>
        <View style={styles.modalStyles.overlay}>
          <View style={styles.modalStyles.modalContent}>
            <Text style={styles.modalStyles.timeModalTitle}>Seleccione la hora de fin</Text>

            <View style={{ height: 150 }}> 
              <FlatList
                  ref={endHourRef}
                  data={infiniteHours}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderTimeOption(item, setSelectedEndHour)}
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
                  style={styles.modalStyles.closeButton}
                  onPress={handleCloseEndHourModal}
                >
                  <Text style={styles.modalStyles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

         {/* Modal de confirmación de reserva */}
          <Modal visible={confirmationModalVisible} animationType="fade" transparent>
            <View style={styles.modalStyles.overlay}>
              <View style={styles.modalStyles.modalContent}>
                <Text style={styles.modalStyles.timeModalTitle}>¡Reserva registrada!</Text>
              </View>
            </View>
          </Modal>

      </View>
      <View style={[styles.bottomBar, { position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ICONS2 name="home-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <ICONS2 name="chatbox-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <ICONS2 name="person-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <ICONS2 name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <ICONS2 name="list-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reservas;
