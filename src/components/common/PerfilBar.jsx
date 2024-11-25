import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PerfilBar = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión");
    setShowMenu(false); // Si estás utilizando este estado
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth", params: { screen: "Landing" } }],
      });
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>DepGuardian</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <ICONS2 name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Image
              source={require("../../../assets/perfil_deep_guardian.jpg")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowMenu(false)}
          >
            <View style={[styles.dropdown, { top: 60, right: 16 }]}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate("Profile");
                }}
              >
                <ICONS2 name="person-outline" size={20} color="black" />
                <Text style={styles.menuText}>Mi Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate("Settings");
                }}
              >
                <ICONS2 name="settings-outline" size={20} color="black" />
                <Text style={styles.menuText}>Configuración</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <ICONS2 name="log-out-outline" size={20} color="red" />
                <Text style={[styles.menuText, { color: "red" }]}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 8,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  iconButton: {
    padding: 4,
  },
  profileContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 4,
  },
});

export default PerfilBar;
