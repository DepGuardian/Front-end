import React from "react";
import { View, Text, Image, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionsData from "../Data/ActionsData";

const ActionsList = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.description}>{item.description}</Text>

        <Button
          title={item.title}
          onPress={() => navigation.navigate(item.link)} // Navegación a la pantalla correspondiente
        />
      </View>
    </View>
  );

  return (
    <FlatList
      style={{
        width: 333,
        height: 333,
      }}
      data={ActionsData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ActionsList;
