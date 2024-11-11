import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from "react-native";

const ToDoFamiliar = () => {
  const [tareas, setTareas] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
    } else {
      Alert.alert("Error", "Escribe una tarea válida");
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const agregarMiembro = () => {
    if (codigo.trim() !== "" && nuevoMiembro.trim() !== "") {
      const nuevo = { id: Date.now().toString(), nombre: nuevoMiembro };
      setMiembros([...miembros, nuevo]);
      setNuevoMiembro("");
      setCodigo("");
      setModalVisible(false);
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

  const eliminarMiembro = (id) => {
    setMiembros(miembros.filter((miembro) => miembro.id !== id));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Planner Familiar</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Tareas:</Text>
      <TextInput
        placeholder="Escribe una nueva tarea"
        value={nuevaTarea}
        onChangeText={setNuevaTarea}
        style={{ borderBottomWidth: 1, padding: 5, marginVertical: 10 }}
      />
      <Pressable
        onPress={agregarTarea}
        style={{
          padding: 10,
          backgroundColor: "lightblue",
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text>Agregar Tarea</Text>
      </Pressable>
      <FlatList
        data={tareas}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ flex: 1 }}>{item.nombre}</Text>
            <Pressable
              onPress={() => eliminarTarea(item.id)}
              style={{ padding: 5 }}
            >
              <Text style={{ color: "red" }}>Eliminar</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Miembros:</Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          padding: 10,
          backgroundColor: "lightblue",
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text>Añadir miembro de la familia</Text>
      </Pressable>
      <FlatList
        data={miembros}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ flex: 1 }}>{item.nombre}</Text>
            <Pressable
              onPress={() => eliminarMiembro(item.id)}
              style={{ padding: 5 }}
            >
              <Text style={{ color: "red" }}>Eliminar</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
              Ingresa el código para añadir un miembro:
            </Text>
            <TextInput
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
              style={{ borderBottomWidth: 1, padding: 5, marginBottom: 15 }}
            />
            <TextInput
              placeholder="Nombre del miembro"
              value={nuevoMiembro}
              onChangeText={setNuevoMiembro}
              style={{ borderBottomWidth: 1, padding: 5, marginBottom: 15 }}
            />
            <Pressable
              onPress={agregarMiembro}
              style={{
                padding: 10,
                backgroundColor: "lightblue",
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text>Añadir miembro</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ padding: 10, borderRadius: 5 }}
            >
              <Text style={{ color: "red" }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ToDoFamiliar;
