import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import { getUserData } from '../../utils/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/HeaderChat';

const SOCKET_URL = 'http://192.168.179.156:3050';

const ChatRoom = ({navigation}) => {
  // Estados para el manejo de la conexión y mensajes
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomIdInput, setRoomIdInput] = useState('');
  
  const flatListRef = useRef(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    loadUserData();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const loadUserData = async () => {
    try {
      const data = await getUserData();
      if (!data) {
        navigation.navigate('Landing');
        return
      }
      setUserData(data);
      initializeSocket(data);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
    }
  };

  // Inicializar socket con los datos del usuario
  const initializeSocket = (userData) => {
    const newSocket = io(SOCKET_URL, {
      query: {
        tenantId: userData.tenantId,
        userId: userData._id,
      },
      transports: ['websocket'],
    });

    setSocket(newSocket);

    // Configurar event listeners del socket
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setConnected(false);
      setCurrentRoom(null);
    });

    newSocket.on('newMessage', handleNewMessage);

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      Alert.alert('Error', 'Error en la conexión del chat');
    });

    return () => {
      newSocket.close();
    };
  };

  // Manejar nuevos mensajes
  const handleNewMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    // Scroll al último mensaje
    if (flatListRef.current) {
      setTimeout(() => flatListRef.current.scrollToEnd(), 100);
    }
  };

  // Unirse a una sala
  const joinRoom = () => {
    if (!roomIdInput.trim()) {
      Alert.alert('Error', 'Por favor ingrese un ID de sala válido');
      return;
    }

    socket.emit('joinRoom', {
      roomId: roomIdInput,
      tenantId: userData.tenantId
    }, (response) => {
      if (Array.isArray(response)) {
        setMessages(response);
        setCurrentRoom(roomIdInput);
        setModalVisible(false);
        setRoomIdInput('');
      }
    });
  };

  // Salir de la sala actual
  const leaveRoom = () => {
    if (currentRoom && socket) {
      socket.emit('leaveRoom', { roomId: currentRoom });
      setCurrentRoom(null);
      setMessages([]);
    }
  };

  // Enviar un nuevo mensaje
  const sendMessage = () => {
    if (!newMessage.trim() || !currentRoom) return;

    const messageData = {
      content: newMessage,
      roomId: currentRoom,
      senderId: userData._id,
      tenantId: userData.tenantId
    };

    socket.emit('sendMessage', messageData, (response) => {
      if (response) {
        setNewMessage('');
      }
    });
  };

  // Renderizar cada mensaje
  const renderMessage = ({ item }) => {
    const isOwnMessage = item.senderId === userData._id;

    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        <Text style={[
          styles.messageSender,
          isOwnMessage ? styles.ownMessageText : styles.otherMessageText
        ]}>
          {isOwnMessage ? 'Tú' : item.senderId}
        </Text>
        <Text style={[
          styles.messageContent,
          isOwnMessage ? styles.ownMessageText : styles.otherMessageText
        ]}>
          {item.content}
        </Text>
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        userData={userData}
        currentRoom={currentRoom}
        onJoinRoom={() => setModalVisible(true)}
        onLeaveRoom={leaveRoom}
      />

      {currentRoom && (
        <View style={styles.roomInfo}>
          <Icon name="chatbubbles-outline" size={20} color="#007AFF" />
          <Text style={styles.roomInfoText}>Sala actual: {currentRoom}</Text>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="chatbubbles-outline" size={50} color="#D1D1D6" />
            <Text style={styles.emptyText}>
              {currentRoom 
                ? "No hay mensajes en esta sala"
                : "Únete a una sala para comenzar a chatear"}
            </Text>
          </View>
        )}
      />

      {currentRoom && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Escribe un mensaje..."
            multiline
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled
            ]} 
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Icon 
              name="send" 
              size={24} 
              color={newMessage.trim() ? '#007AFF' : '#999'} 
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Unirse a una sala</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalInput}
              value={roomIdInput}
              onChangeText={setRoomIdInput}
              placeholder="Ingrese el ID de la sala"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[
                  styles.modalButton,
                  !roomIdInput.trim() && styles.modalButtonDisabled
                ]}
                onPress={joinRoom}
                disabled={!roomIdInput.trim()}
              >
                <Text style={styles.modalButtonText}>Unirse</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#FFF',
    marginLeft: 4,
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 8,
  },
  leaveButtonText: {
    color: '#FFF',
    marginLeft: 4,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageSender: {
    fontSize: 12,
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 16,
  },
  ownMessageText: {
    color: '#FFF',
  },
  otherMessageText: {
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  modalButtonJoin: {
    backgroundColor: '#007AFF',
  },
  modalButtonCancel: {
    backgroundColor: '#FF3B30',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    avatarContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#007AFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    roomButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#F6F6F6',
    },
    roomButtonText: {
      marginLeft: 4,
      color: '#007AFF',
      fontWeight: '600',
    },
    roomInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#E8F2FF',
      borderBottomWidth: 1,
      borderBottomColor: '#D1E3FF',
    },
    roomInfoText: {
      marginLeft: 8,
      color: '#007AFF',
      fontWeight: '600',
    },
    menuContainer: {
      position: 'absolute',
      backgroundColor: '#FFF',
      borderRadius: 12,
      paddingVertical: 8,
      width: 250,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuHeader: {
      padding: 16,
    },
    menuName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 4,
    },
    menuEmail: {
      fontSize: 14,
      color: '#666',
    },
    roomBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F0F8FF',
      padding: 8,
      borderRadius: 8,
      marginTop: 8,
    },
    roomBadgeText: {
      marginLeft: 4,
      color: '#007AFF',
      fontSize: 14,
    },
});

export default ChatRoom;