import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ chat, goBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem(`messages-${chat.id}`);
      if (storedMessages) setMessages(JSON.parse(storedMessages));
    };
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const updatedMessages = [
        ...messages,
        { id: Date.now().toString(), text: newMessage, sender: "me" },
      ];
      setMessages(updatedMessages);
      await AsyncStorage.setItem(
        `messages-${chat.id}`,
        JSON.stringify(updatedMessages)
      );
      setNewMessage("");
    }
  };

  const renderMessageItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text
        style={
          item.sender === "me" ? styles.myMessageText : styles.otherMessageText
        }
      >
        {item.text}
      </Text>
    </View>
  );

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Error: Chat no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>
      <Text style={styles.chatTitle}>{chat.name}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            No hay mensajes todavía.
          </Text>
        )}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  chatTitle: { fontSize: 18, fontWeight: "bold", padding: 10 },
  messagesList: { flex: 1, padding: 10 },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  myMessage: { backgroundColor: "#007bff", alignSelf: "flex-end" },
  myMessageText: { color: "#fff" },
  otherMessage: { backgroundColor: "#f1f1f1", alignSelf: "flex-start" },
  otherMessageText: { color: "#000" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: { color: "#fff" },
  backButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "flex-start",
    margin: 10,
  },
  backButtonText: { color: "#000", fontWeight: "bold" },
});

export default Chat;
