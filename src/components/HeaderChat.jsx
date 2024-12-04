import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {   View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


const Header = ({ userData, currentRoom, onJoinRoom, onLeaveRoom }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>DepGuardian</Text>
      <View style={styles.headerActions}>
        {!currentRoom ? (
          <TouchableOpacity 
            style={styles.roomButton} 
            onPress={onJoinRoom}
          >
            <Icon name="enter-outline" size={20} color="#007AFF" />
            <Text style={styles.roomButtonText}>Unirse a sala</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.roomButton} 
            onPress={onLeaveRoom}
          >
            <Icon name="exit-outline" size={20} color="#FF3B30" />
            <Text style={[styles.roomButtonText, { color: '#FF3B30' }]}>Salir</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          onPress={() => setIsMenuVisible(true)}
          style={styles.avatarContainer}
        >
          <Text style={styles.avatarText}>
            {userData?.fullName?.[0].toLocaleUpperCase() ?? '.'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={[styles.menuContainer, { top: 60, right: 16 }]}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuName}>{userData?.fullName}</Text>
              <Text style={styles.menuEmail}>{userData?.email}</Text>
              {currentRoom && (
                <View style={styles.roomBadge}>
                  <Icon name="chatbubbles-outline" size={16} color="#007AFF" />
                  <Text style={styles.roomBadgeText}>Sala: {currentRoom}</Text>
                </View>
              )}
            </View>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Icon name="log-out-outline" size={20} color="#FF3B30" />
              <Text style={styles.menuItemTextLogout} color="#FF3B30" >Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Header;

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
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 12,
    },
    menuItemTextLogout: {
      color: "#FF3B30"
    }
});