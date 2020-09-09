import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function TouchableText(props) {
  const {onPressAction, text} = props;
  return (
    <TouchableOpacity onPress={onPressAction}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: '#FFF',
    fontSize: 18,
    borderColor: '#35414b',
    borderWidth: 1,
    padding: 10,
  },
});
