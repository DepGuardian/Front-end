import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Header = ({ userData }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Auth', { screen: 'Landing' });
      return
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>DepGuardian</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity 
          onPress={() => setIsMenuVisible(true)}
          style={styles.avatarContainer}
        >
          <Text style={styles.avatarText}>
            {userData?.fullName[0].toLocaleUpperCase() ?? '.'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsMenuVisible(false)}
        >
          <Pressable style={[
            styles.menuContainer,
            {
              top: 60,  // Posiciona el menú justo debajo del header
              right: 16 // Alinea con el margen derecho
            }
          ]}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuName}>{userData?.fullName}</Text>
              <Text style={styles.menuEmail}>{userData?.email}</Text>
            </View>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Icon name="log-out-outline" size={20} color="#FF3B30" />
              <Text style={styles.menuItemTextLogout}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 8,
    width: 220,
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
  menuDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemTextLogout: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FF3B30',
  },
});

export default Header;