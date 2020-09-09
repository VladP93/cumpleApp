import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {validateEmail} from '../utils/validations';
import TouchableText from './TouchableText';

import firebase from '../utils/firebase';
import 'firebase/auth';

export default function RegisterForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValues());
  const [formError, setFormError] = useState({});

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) {
        errors.email = true;
      }
      if (!formData.password) {
        errors.password = true;
      }
      if (!formData.repeatPassword) {
        errors.repeatPassword = true;
      }
    }
    if (!validateEmail(formData.email)) {
      errors.email = true;
    }
    if (
      formData.password !== formData.repeatPassword ||
      formData.password.length < 6 ||
      formData.repeatPassword.length < 6
    ) {
      errors.password = true;
      errors.repeatPassword = true;
    }
    if (!errors.empty) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          ToastAndroid.show('Cuenta registrada', ToastAndroid.SHORT);
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
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.errorInput]}
        placeholder="Repetir contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({...formData, repeatPassword: e.nativeEvent.text})
        }
      />
      <TouchableText text="Regístrate" onPressAction={register} />
      <View style={styles.login}>
        <TouchableText text="Iniciar Sesión" onPressAction={changeForm} />
      </View>
    </>
  );
}

function defaultValues() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
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
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginTop: 50,
  },
  errorInput: {
    borderColor: '#940c0c',
  },
});
