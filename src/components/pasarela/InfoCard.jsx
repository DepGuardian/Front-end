import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const InfoCard = ({ code, nextPayment, onChatPress }) => {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{code}</Text>
      </View>
      <TouchableOpacity style={styles.infoBox} onPress={onChatPress}>
        <Text style={styles.infoText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 10,
  },
  infoBox: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
});
