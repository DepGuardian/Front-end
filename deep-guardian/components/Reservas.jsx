import React from "react"; 
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles.js";
import ICONS from "react-native-vector-icons/FontAwesome";
import ICONS2 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Reservas = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.general, { backgroundColor: "white" }]}>
      <View style={[styles.logo_deep_foto,{
        top:-5,
        zIndex:2,

      }]}>
        <Text
          style={[
            styles.textbuttonWhite,
            {
              position: "absolute",
              left: 15,
              fontSize: 21,
              fontWeight: "700",
              zIndex: 2,
            },
          ]}
        >
          DepGuardian
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            left: -20,
            marginTop: 0,
          }}
        >
          <ICONS2 name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/perfil_deep_guardian.jpg")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: -280,
          }}
        />
      </View>

      <View style={styles.nombre_pag}>
        {/* El apartado del nombre */}
        <Text
          style={[
            styles.textbuttonWhite,
            {
              position: "absolute",
              top: 70,
              left: 10,
              fontSize: 24,
              fontWeight: "900",
            },
          ]}
        >
          Reserva un área común
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            left: 160,
            top: 55,
          }}
        >
          <ICONS2 name="ticket-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={[styles.Card_reservas,{
        height:645,
      }]}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <View key={index} style={styles.Card_reservas_ejemplo}>
              <Image
                source={require("../assets/sala_juegos.jpg")}
                style={{
                  width: 150,
                  height: 130,
                  borderRadius: 40,
                  marginRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <Text
                style={[
                  styles.textbuttonWhite,
                  {
                    position: "absolute",
                    top: 4,
                    left: 170,
                    fontSize: 23,
                  },
                ]}
              >
                Salón de juegos
              </Text>
              <TouchableOpacity
                style={[
                  styles.buttonBlack_ch,
                  {
                    position: "absolute",
                    bottom: 7,
                    left: 150,
                  },
                ]}
                onPress={() => {
                  console.log("Navegando a SignIn desde Sign Up");
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.textbuttonBlack_ch}>
                  Ver disponibilidad
                </Text>
                <ICONS name="arrow-right" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <ICONS2 name="home-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <ICONS2 name="chatbox-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <ICONS2 name="person-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <ICONS2 name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <ICONS2 name="list-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Reservas;
