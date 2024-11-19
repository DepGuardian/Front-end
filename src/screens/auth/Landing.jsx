// src/screens/Landing.js
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import ICONS from 'react-native-vector-icons/FontAwesome';
import ICONS2 from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Landing = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../assets/probb.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.titleSmall}>Deep Guardian</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.titleLarge}>Miraflores</Text>
              <Text style={styles.titleLarge}>Urban</Text>
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.buttonTextPrimary}>Sign Up</Text>
              <ICONS2 name="person" size={15} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.buttonTextSecondary}>Sign in</Text>
              <ICONS name="sign-in" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    paddingHorizontal: 24,
    minHeight: 340, // Asegura un espacio mínimo para el contenido
  },
  header: {
    marginBottom: 32,
  },
  titleSmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 24,
  },
  titleLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: Math.min(width * 0.13, 50), // Responsive font size
    lineHeight: Math.min(width * 0.15, 60), // Responsive line height
    color: '#000',
  },
  buttonWrapper: {
    gap: 12,
    marginTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  buttonPrimary: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    gap: 8,
  },
  buttonTextPrimary: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default Landing;