import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import logo from '../assets/logo.png';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={logo}></Image>
      {isLogin ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 240,
    marginTop: 50,
    marginBottom: 50,
  },
});
