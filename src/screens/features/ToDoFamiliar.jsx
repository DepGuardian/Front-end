import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ICONS from "react-native-vector-icons/Ionicons";

const ToDoFamiliar = () => {
  const navigation = useNavigation();
  const [tareas, setTareas] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [modalVisibleTarea, setModalVisibleTarea] = useState(false);
  const [modalVisibleMiembro, setModalVisibleMiembro] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nuevoMiembro, setNuevoMiembro] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      const nueva = {
        id: Date.now().toString(),
        nombre: nuevaTarea,
        hecha: false,
      };
      setTareas([...tareas, nueva]);
      setNuevaTarea("");
      setModalVisibleTarea(false);
    } else {
      Alert.alert("Error", "Escribe una tarea válida");
    }
  };

  const toggleCheckbox = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    );
  };

  const agregarMiembro = () => {
    if (codigo.trim() !== "" && nuevoMiembro.trim() !== "") {
      const nuevo = { id: Date.now().toString(), nombre: nuevoMiembro };
      setMiembros([...miembros, nuevo]);
      setNuevoMiembro("");
      setCodigo("");
      setModalVisibleMiembro(false);
      Alert.alert(
        "Miembro agregado",
        "Se ha añadido a la persona correctamente"
      );
    } else {
      Alert.alert(
        "Error",
        "Por favor, ingresa un código y el nombre del miembro"
      );
    }
  };

  const renderTarea = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => toggleCheckbox(item.id)}
        style={styles.checkbox}
      >
        {item.hecha && <View style={styles.checkboxInner} />}
      </TouchableOpacity>
      <Text
        style={[
          styles.taskText,
          { textDecorationLine: item.hecha ? "line-through" : "none" },
        ]}
      >
        {item.nombre}
      </Text>
    </View>
  );

  const renderMiembro = ({ item }) => (
    <View style={styles.memberItem}>
      <Text style={styles.taskText}>{item.nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Pasarela")}
        style={styles.backButton}
      >
        <ICONS name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Planner Familiar</Text>

      <Pressable
        onPress={() => setModalVisibleTarea(true)}
        style={styles.taskButton}
      >
        <Text style={styles.addText}>+</Text>
        <Text style={styles.buttonText}>Agregar Tarea</Text>
      </Pressable>

      <FlatList
        data={tareas}
        renderItem={renderTarea}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />

      <Text style={[styles.buttonText, styles.sectionTitle]}>Miembros:</Text>

      <Pressable
        onPress={() => setModalVisibleMiembro(true)}
        style={styles.taskButton}
      >
        <Text style={styles.addText}>+</Text>
        <Text style={styles.buttonText}>Añadir miembro</Text>
      </Pressable>

      <FlatList
        data={miembros}
        renderItem={renderMiembro}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />

      {/* Modal para agregar tarea */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTarea}
        onRequestClose={() => setModalVisibleTarea(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escribe la nueva tarea:</Text>
            <TextInput
              placeholder="Tarea"
              value={nuevaTarea}
              onChangeText={setNuevaTarea}
              style={styles.input}
            />
            <Pressable
              onPress={agregarTarea}
              style={[styles.modalButton, styles.addButton]}
            >
              <Text style={styles.buttonText}>Añadir Tarea</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisibleTarea(false)}
              style={styles.modalButton}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal para agregar miembro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMiembro}
        onRequestClose={() => setModalVisibleMiembro(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Ingresa el código para añadir un miembro:
            </Text>
            <TextInput
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
              style={styles.input}
            />
            <TextInput
              placeholder="Nombre del miembro"
              value={nuevoMiembro}
              onChangeText={setNuevoMiembro}
              style={styles.input}
            />
            <Pressable
              onPress={agregarMiembro}
              style={[styles.modalButton, styles.addButton]}
            >
              <Text style={styles.buttonText}>Añadir miembro</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisibleMiembro(false)}
              style={styles.modalButton}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  sectionTitle: {
    marginTop: 20,
  },
  taskButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addText: {
    fontSize: 24,
    marginRight: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "green",
    borderRadius: 6,
  },
  taskText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "lightblue",
  },
  cancelText: {
    color: "red",
    fontSize: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  listContainer: {
    maxHeight: 200,
    marginTop: 10,
  },
});

export default ToDoFamiliar;
