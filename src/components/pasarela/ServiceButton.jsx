import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ServiceButton = ({ icon, label, onPress, family = 'FontAwesome' }) => {
  const IconComponent = family === 'Ionicons' ? Ionicons : FontAwesome;
  
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconComponent name={icon} size={20} color="black" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
});