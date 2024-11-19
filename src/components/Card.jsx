// src/components/Card.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

const Card = ({ navigation, closeModal }) => {
  const [propietarioCode, setPropietarioCode] = useState('');

  const handleSubmit = () => {
    if (propietarioCode.trim()) {
      closeModal();
      navigation.navigate('MainApp', {
        screen: 'Pasarela'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Código de propietario
      </Text>

      <TextInput
        style={styles.input}
        value={propietarioCode}
        onChangeText={setPropietarioCode}
        placeholder="Ingrese su código"
        placeholderTextColor="#9F9F9F"
        textAlign="center"
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    width: '80%',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default Card;