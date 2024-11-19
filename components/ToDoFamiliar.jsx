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
  Button,
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
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}
    >
      <TouchableOpacity
        onPress={() => toggleCheckbox(item.id)}
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        {item.hecha && (
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: "green",
              borderRadius: 6,
            }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          textDecorationLine: item.hecha ? "line-through" : "none",
        }}
      >
        {item.nombre}
      </Text>
    </View>
  );

  const renderMiembro = ({ item }) => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}
    >
      <Text style={{ fontSize: 16 }}>{item.nombre}</Text>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ICONS name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Planner Familiar</Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Pressable
          onPress={() => setModalVisibleTarea(true)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, marginRight: 5 }}>+</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Agregar Tarea
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={tareas}
        renderItem={renderTarea}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: 200, marginTop: 10 }}
      />

      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 18 }}>
        Miembros:
      </Text>
      <Pressable
        onPress={() => setModalVisibleMiembro(true)}
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Text style={{ fontSize: 24, marginRight: 5 }}>+</Text>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Añadir miembro</Text>
      </Pressable>

      <FlatList
        data={miembros}
        renderItem={renderMiembro}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: 200, marginTop: 10 }}
      />

      {/* Modal para agregar tarea */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTarea}
        onRequestClose={() => setModalVisibleTarea(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}
            >
              Escribe la nueva tarea:
            </Text>
            <TextInput
              placeholder="Tarea"
              value={nuevaTarea}
              onChangeText={setNuevaTarea}
              style={{
                borderBottomWidth: 1,
                padding: 10,
                marginBottom: 15,
                fontSize: 16,
              }}
            />
            <Pressable
              onPress={agregarTarea}
              style={{
                padding: 12,
                backgroundColor: "lightblue",
                borderRadius: 8,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Añadir Tarea
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisibleTarea(false)}
              style={{ padding: 12, borderRadius: 8, alignItems: "center" }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>Cancelar</Text>
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}
            >
              Ingresa el código para añadir un miembro:
            </Text>
            <TextInput
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
              style={{
                borderBottomWidth: 1,
                padding: 10,
                marginBottom: 15,
                fontSize: 16,
              }}
            />
            <TextInput
              placeholder="Nombre del miembro"
              value={nuevoMiembro}
              onChangeText={setNuevoMiembro}
              style={{
                borderBottomWidth: 1,
                padding: 10,
                marginBottom: 15,
                fontSize: 16,
              }}
            />
            <Pressable
              onPress={agregarMiembro}
              style={{
                padding: 12,
                backgroundColor: "lightblue",
                borderRadius: 8,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Añadir miembro
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisibleMiembro(false)}
              style={{ padding: 12, borderRadius: 8, alignItems: "center" }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ToDoFamiliar;
