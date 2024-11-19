import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { theme } from '../../theme';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <ImageBackground
      source={require('../../../assets/probb.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Deep Guardian</Text>
            <Text style={styles.subtitle}>Miraflores Urban</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Usuario o Correo Electrónico"
              placeholder="Ingrese su email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label="Regresar"
              variant="secondary"
              onPress={() => navigation.navigate('Landing')}
              icon={{ name: 'return-down-back', position: 'left', family: 'Ionicons' }}
            />
            <Button
              label="Ingresar"
              variant="primary"
              onPress={() => navigation.navigate('Pasarela')}
              icon={{ name: 'sign-in', position: 'right' }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
  },
  subtitle: {
    ...theme.typography.h1,
  },
  form: {
    gap: theme.spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
  },
});

export default SignUp;