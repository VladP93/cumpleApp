import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Birthday(props) {
  const {birthday, deleteBirthday} = props;
  const past = birthday.days > 0 ? true : false;

  const infoDay = () => {
    if (birthday.days === 0) {
      return <Text style={{color: '#FFF'}}>Es hoy</Text>;
    } else {
      const days = birthday.days * -1;

      return (
        <View style={styles.textCurrent}>
          <Text>
            {days === 1 ? `Falta ${days} día` : `Faltan ${days} días`}
          </Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        past ? styles.past : birthday.days === 0 ? styles.now : styles.current,
      ]}
      onPress={() => deleteBirthday(birthday)}>
      <Text style={styles.username}>
        {birthday.name} {birthday.lastname}
      </Text>
      {past ? <Text style={{color: '#fff'}}>Pasado</Text> : infoDay()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  now: {
    backgroundColor: '#559204',
  },
  current: {
    backgroundColor: '#1a81f2',
  },
  past: {
    backgroundColor: '#e23311',
  },
  username: {
    color: '#fff',
    fontSize: 16,
  },
  textCurrent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
