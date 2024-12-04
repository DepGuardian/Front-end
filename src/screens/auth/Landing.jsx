// src/screens/Landing.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconPerson from 'react-native-vector-icons/Ionicons';
import { getUserData } from '../../utils/storage';

const { width } = Dimensions.get('window');

const Landing = ({ navigation }) => {
  useEffect(() => {
    // Verificar si el usuario ya ha iniciado sesión
    // Si es así, redirigirlo a la pantalla de inicio

    const userData = async () => {
      const user = await getUserData();
      if (!user) {
        return;
      }
      navigation.navigate('MainApp', { screen: 'Pasarela' });
    };
    userData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Contenedor principal blanco */}
          <View style={styles.content}>
            {/* Sección del encabezado */}
            <View style={styles.header}>
              <Text style={styles.titleSmall}>Deep Guardian</Text>
              <View style={styles.titleContainer}>
                <Text style={styles.titleLarge}>Miraflores</Text>
                <Text style={styles.titleLarge}>Urban</Text>
              </View>
            </View>

            {/* Sección de botones */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonTextPrimary}>Sign Up</Text>
                <IconPerson name="person" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.buttonTextSecondary}>Sign In</Text>
                <Icon name="sign-in" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    minHeight: 340,
  },
  header: {
    marginBottom: 32,
  },
  titleSmall: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    // Nota: En React Native necesitarás configurar las fuentes personalizadas
    // fontFamily: 'Poppins-Regular',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 24,
  },
  titleLarge: {
    fontSize: Math.min(width * 0.13, 50),
    lineHeight: Math.min(width * 0.15, 60),
    color: '#000000',
    // fontFamily: 'Poppins-Bold',
  },
  buttonWrapper: {
    gap: 12,
    marginTop: 24,
  },
  buttonPrimary: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    gap: 8,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontFamily: 'Poppins-Regular',
  },
  buttonTextSecondary: {
    color: '#000000',
    fontSize: 16,
    // fontFamily: 'Poppins-Regular',
  },
});

export default Landing;