import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export const QuickActionCard = ({ image, description, buttonText, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.text}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});