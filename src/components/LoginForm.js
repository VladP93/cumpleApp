import React, {useState} from 'react';
import {StyleSheet, View, TextInput, ToastAndroid} from 'react-native';
import TouchableText from './TouchableText';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValues());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};

    if (!formData.email || !formData.password) {
      if (!formData.email) {
        errors.email = true;
      }
      if (!formData.password) {
        errors.password = true;
      }
      ToastAndroid.show(
        'Por favor, complete todos los campos.',
        ToastAndroid.SHORT,
      );
    }
    if (!validateEmail(formData.email)) {
      errors.email = true;
      ToastAndroid.show(
        'Por favor, ingrese un correo válido',
        ToastAndroid.SHORT,
      );
    }
    if (formData.password.length < 6) {
      errors.password = true;
      ToastAndroid.show(
        'La contraseña debe debe tener al menos 6 caracteres.',
        ToastAndroid.SHORT,
      );
    }
    if (!errors.empty) {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          ToastAndroid.show('Bienvenido', ToastAndroid.SHORT);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFormError(errors);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />
      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({...formData, password: e.nativeEvent.text})
        }
      />
      <TouchableText text="Iniciar Sesión" onPressAction={login} />
      <View style={styles.register}>
        <TouchableText text="Regístrate" onPressAction={changeForm} />
      </View>
    </>
  );
}

function defaultValues() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 70,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginTop: 50,
  },
  errorInput: {
    borderColor: '#940c0c',
  },
});
