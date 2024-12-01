import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([
    {
      id: "1",
      name: "Juan Gutierrez-A708",
      lastMessage: "Leído",
      unread: false,
    },
    {
      id: "2",
      name: "Jorge Tipe-A506",
      lastMessage: "Fiesta en el salón del depa",
      unread: true,
      time: "12:30",
    },
    {
      id: "3",
      name: "Angel Napa-A101",
      lastMessage: "Estudiamos Ada?",
      unread: true,
      time: "12:45",
    },
    {
      id: "4",
      name: "Admin",
      lastMessage: "Perales me debes un mes de renta",
      unread: false,
      time: "2:30",
    },
    {
      id: "5",
      name: "Recepción",
      lastMessage: "Le ha llegado un envío, favor de recogerlo",
      unread: true,
      time: "9:30",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputCode, setInputCode] = useState("");

  // Simulación del backend para obtener el nombre y apellido
  const fetchChatDetails = (code) => {
    const backendResponse = {
      8218221: { name: "Pepito Alcachofa", id: "6" },
      2121213: { name: "Aaroncito TuTerror", id: "7" },
    };
    return backendResponse[code] || null;
  };

  const addNewChat = () => {
    const chatDetails = fetchChatDetails(inputCode.trim());
    if (chatDetails) {
      const exists = chats.some((chat) => chat.id === chatDetails.id);
      if (exists) {
        Alert.alert("Advertencia", "Este chat ya existe en tu lista.");
      } else {
        setChats((prevChats) => [
          ...prevChats,
          {
            id: chatDetails.id,
            name: chatDetails.name,
            lastMessage: "",
            unread: false,
          },
        ]);
        Alert.alert("Éxito", "El chat se ha agregado correctamente.");
        setModalVisible(false);
        setInputCode("");
      }
    } else {
      Alert.alert("Error", "Código inválido. Intente nuevamente.");
    }
  };

  const openChat = (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    navigation.navigate("ChatsTab", {
      screen: "Chat",
      params: { chat: selectedChat },
    });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item.id)}>
      <Image
        source={require("../../../assets/usuario.png")}
        style={styles.avatar}
      />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      {item.unread && <View style={styles.unreadDot}></View>}
      {item.time && <Text style={styles.time}>{item.time}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.newChatText}>+ Nuevo chat</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingrese el código del chat</Text>
            <TextInput
              style={styles.input}
              placeholder="Código"
              value={inputCode}
              onChangeText={setInputCode}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addNewChat}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  chatDetails: { flex: 1 },
  chatName: { fontWeight: "bold", fontSize: 16 },
  lastMessage: { color: "#777" },
  unreadDot: {
    width: 10,
    height: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    marginLeft: 10,
  },
  time: { color: "#777", fontSize: 12 },
  newChatButton: {
    padding: 15,
    backgroundColor: "#007bff",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  newChatText: { color: "#fff", fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  cancelButton: { backgroundColor: "#ccc" },
  modalButtonText: { color: "#fff", fontSize: 16 },
});

export default Chats;
