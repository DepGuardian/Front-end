import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import Card from '../../components/Card';

const SignIn = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    departamento: '',
  });
  const [showModal, setShowModal] = useState(false);

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
            <Text style={styles.titleLarge}>Miraflores Urban</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Nombre Completo"
              placeholder="Ingrese su Nombre"
              value={formData.nombre}
              onChangeText={(text) => setFormData({ ...formData, nombre: text })}
            />
            <Input
              label="Apellido"
              placeholder="Ingrese su apellido"
              value={formData.apellido}
              onChangeText={(text) => setFormData({ ...formData, apellido: text })}
            />
            <Input
              label="Departamento"
              placeholder="Ingrese su departamento"
              value={formData.departamento}
              onChangeText={(text) => setFormData({ ...formData, departamento: text })}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              label="Regresar"
              variant="secondary"
              onPress={() => navigation.navigate('Landing')}
              icon={{ name: 'arrow-left', position: 'left' }}
            />
            <Button
              label="Ingresar"
              variant="primary"
              onPress={() => setShowModal(true)}
              icon={{ name: 'sign-in', position: 'right' }}
            />
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <Card
                  navigation={navigation}
                  closeModal={() => setShowModal(false)}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  titleSmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#000',
  },
  titleLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#000',
    marginTop: 5,
  },
  form: {
    gap: 15,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default SignIn;