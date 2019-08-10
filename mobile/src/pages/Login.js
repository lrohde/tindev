import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import AsycStorage from '@react-native-community/async-storage';

import api from '../services/api';

import logo from '../assets/logo.png';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsycStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    })
  }, [])

  async function handleLogin() {
    const response = await api.post('/devs', { username: user })

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no GitHub"
        style={styles.input}
        placeholderTextColor="#999"
        onChangeText={setUser}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.butonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  butonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
