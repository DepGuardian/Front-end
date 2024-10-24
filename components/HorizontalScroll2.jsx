import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // O Ionicons, según prefieras
import AlertsContent2 from "../Data/AlertsContent2";
const HorizontalScroll2 = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.box}>
        <Icon name={item.icon} size={18} color="black" style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    // <View style={styles.Pasarela}>
    <FlatList
      data={AlertsContent2}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal // Para alinear los elementos en fila horizontal
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  Pasarela: {
    // padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  box: {
    // backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 8,
    // marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    // margin: 5,
    width: 107,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Colocar el icono y el texto en línea
    borderColor: "black",
    borderWidth: 1,
  },
  icon: {
    marginRight: 5, // Espaciado entre el ícono y el texto
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HorizontalScroll2;
