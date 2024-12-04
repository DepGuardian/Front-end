import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PerfilBar from "../../components/common/PerfilBar";
import { getUserData } from "../../utils/storage";
import Header from "../../components/Header";

const API_URL = 'http://192.168.179.156:7091';

const ToDoFamiliar = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [modalVisibleTarea, setModalVisibleTarea] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        console.log('USER DATA', data);
        // Cargar tareas una vez que tenemos los datos del usuario
        if (data) {
          fetchTareas(data);
        } else {
          navigator.navigate('MainApp', { screen: 'Pasarela' });
        }
      } catch (error) {
        console.error('Error cargando datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
      }
    };

    loadUserData();
  }, []);

  // Función para obtener todas las tareas
  const fetchTareas = async (user) => {
    try {
      const response = await fetch(
        `${API_URL}/todo?tenantId=${user.tenantId}&residentId=${user._id}`,
        {
          headers: {
            'accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }

      const data = await response.json();
      setTareas(data.data);
    } catch (error) {
      console.error('Error obteniendo tareas:', error);
      Alert.alert('Error', 'No se pudieron cargar las tareas');
    }
  };

  // Función para agregar una nueva tarea
  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "" || !userData) {
      Alert.alert("Error", "Escribe una tarea válida");
      return;
    }

    try {
      setIsTaskLoading(true);
      const response = await fetch(`${API_URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          tenantId: userData.tenantId,
          data: {
            title: nuevaTarea,
            done: false,
            id: Date.now().toString() // Generamos un ID temporal
          },
          residentId: userData._id
        })
      });

      if (!response.ok) {
        setIsTaskLoading(false);
        throw new Error('Error al crear la tarea');
      }

      // Recargar las tareas después de agregar una nueva
      await fetchTareas(userData);
      setNuevaTarea("");
      setModalVisibleTarea(false);
      setIsTaskLoading(false);
    } catch (error) {
      setIsTaskLoading(false);
      console.error('Error creando tarea:', error);
      Alert.alert('Error', 'No se pudo crear la tarea');
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = async (todoId) => {
    try {
      const response = await fetch(`${API_URL}/todo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          tenantId: userData.tenantId,
          todoId: todoId,
          residentId: userData._id
        })
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      // Recargar las tareas después de eliminar
      await fetchTareas(userData);
    } catch (error) {
      console.error('Error eliminando tarea:', error);
      Alert.alert('Error', 'No se pudo eliminar la tarea');
    }
  };

  const renderTarea = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => eliminarTarea(item.id)}
        style={styles.checkbox}
      >
        {item.done ? (
          <Icon name="checkmark-circle" size={24} color="#007AFF" />
        ) : (
          <Icon name="ellipse-outline" size={24} color="#666" />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.taskText,
          item.done && styles.taskTextCompleted
        ]}
      >
        {item.title}
      </Text>
      <Text style={styles.taskDate}>
        {new Date().toLocaleDateString()}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Header userData={userData} />

      <Text style={styles.title}>Planner Familiar</Text>

      <TouchableOpacity
        onPress={() => setModalVisibleTarea(true)}
        style={styles.addTaskButton}
      >
        <Icon name="add" size={24} color="#000" />
        <Text style={styles.addTaskText}>Agregar Tarea</Text>
      </TouchableOpacity>

      <FlatList
        data={tareas}
        renderItem={renderTarea}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay tareas pendientes</Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTarea}
        onRequestClose={() => setModalVisibleTarea(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nueva Tarea</Text>
              <TouchableOpacity 
                onPress={() => setModalVisibleTarea(false)}
                disabled={isTaskLoading}
              >
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="¿Qué necesitas hacer?"
              value={nuevaTarea}
              onChangeText={setNuevaTarea}
              style={styles.modalInput}
              editable={!isTaskLoading}
              multiline
            />

            <TouchableOpacity
              onPress={agregarTarea}
              style={[styles.modalButton, isTaskLoading && styles.modalButtonDisabled]}
              disabled={isTaskLoading || !nuevaTarea.trim()}
            >
              {isTaskLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.modalButtonText}>Agregar Tarea</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  addTaskText: {
    fontSize: 16,
    color: '#000',
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checkbox: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  taskTextCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    minHeight: 100,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalButtonDisabled: {
    backgroundColor: '#999',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

export default ToDoFamiliar;