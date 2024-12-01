import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const Chat = ({ route }) => {
  const { chat } = route.params;
  const [messages, setMessages] = useState([
    { id: "1", text: "Hola, ¿cómo estás?", sender: "other" },
    { id: "2", text: "Todo bien, gracias. ¿Y tú?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: newMessage, sender: "me" },
      ]);
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
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.chatTitle}>{chat.name}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
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
  otherMessage: { backgroundColor: "#f1f1f1", alignSelf: "flex-start" },
  messageText: { color: "#fff" },
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
});

export default Chat;
