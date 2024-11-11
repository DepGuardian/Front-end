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

  const renderItem = ({ item, onDelete }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 10,
      }}
    >
      <Text style={{ fontSize: 20, marginRight: 10 }}>•</Text>
      <Text style={{ flex: 1, fontSize: 16 }}>{item.nombre}</Text>
      <Pressable
        onPress={() => onDelete(item.id)}
        style={{
          padding: 8,
          backgroundColor: "#ffebee",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "red" }}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Planner Familiar</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 18 }}>
        Tareas:
      </Text>
      <TextInput
        placeholder="Escribe una nueva tarea"
        value={nuevaTarea}
        onChangeText={setNuevaTarea}
        style={{
          borderBottomWidth: 1,
          padding: 10,
          marginVertical: 10,
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
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Agregar Tarea</Text>
      </Pressable>

      <FlatList
        data={tareas}
        renderItem={({ item }) => renderItem({ item, onDelete: eliminarTarea })}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: 200 }}
      />

      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 18 }}>
        Miembros:
      </Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          padding: 12,
          backgroundColor: "lightblue",
          borderRadius: 8,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Añadir miembro de la familia
        </Text>
      </Pressable>

      <FlatList
        data={miembros}
        renderItem={({ item }) =>
          renderItem({ item, onDelete: eliminarMiembro })
        }
        keyExtractor={(item) => item.id}
        style={{ maxHeight: 200 }}
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
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
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
              onPress={() => setModalVisible(false)}
              style={{
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
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
