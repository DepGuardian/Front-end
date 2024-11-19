import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AlertsContent from "../Data/AlertsContent";

const HorizontalScroll = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.box, { width: 120 }]}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.box}>
        <Text
          style={[
            styles.detail,
            {
              color: "white",
              fontSize: 9,
              lineHeight: 15,
              fontWeight: 650,
              fontStyle: "normal",
            },
          ]}
        >
          {item.detail}
        </Text>
      </View>
      <TouchableOpacity style={styles.box}>
        <Text style={styles.action}>{item.action}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={AlertsContent}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "stretch",
    // borderWidth: 1,
  },
  box: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingBottom: 10,
    paddingTop: 10,
    margin: 5,
    width: 80,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  action: {
    color: "white",
    fontSize: 14,
  },
});

export default HorizontalScroll;
