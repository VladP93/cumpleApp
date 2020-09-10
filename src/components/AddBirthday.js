import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, ToastAndroid} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import TouchableText from './TouchableText';

import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday(props) {
  const {user, setShowList, setReloadData} = props;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const handlerConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    dateBirth.setMilliseconds(0);
    setFormData({...formData, dateBirth});

    hideDatePicker();
  };

  const onSubmit = () => {
    let errors = {};

    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) {
        errors.name = true;
      }
      if (!formData.lastname) {
        errors.lastname = true;
      }
      if (!formData.dateBirth) {
        errors.dateBirth = true;
      }
      ToastAndroid.show(
        'Por favor, complete todos los campos.',
        ToastAndroid.SHORT,
      );
    } else {
      const data = formData;
      data.dateBirth.setYear(0);

      db.collection(user.uid)
        .add(data)
        .then((res) => {
          ToastAndroid.show(
            `El cumpleaños de ${data.name} se agregó`,
            ToastAndroid.SHORT,
          );
          setReloadData(true);
          setShowList(true);
        })
        .catch((err) => {
          ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
        });
    }

    setFormError(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.name && styles.error]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => {
            setFormData({...formData, name: e.nativeEvent.text});
          }}
        />
        <TextInput
          style={[styles.input, formError.lastname && styles.error]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={(e) => {
            setFormData({...formData, lastname: e.nativeEvent.text});
          }}
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formError.dateBirth && styles.error,
          ]}>
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}>
            {formData.dateBirth
              ? moment(formData.dateBirth).format('LL')
              : 'Fecha de nacimiento'}
          </Text>
        </View>
        <TouchableText text="Crear cumpleaños" onPressAction={onSubmit} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handlerConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

function defaultValue() {
  return {
    name: '',
    lastname: '',
    dateBirth: '',
  };
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datepicker: {
    justifyContent: 'center',
  },
  error: {
    borderColor: '#940c0c',
  },
});
