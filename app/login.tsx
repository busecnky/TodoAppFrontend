import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError('Invalid credentials');
        return;
      }

      const { token } = await response.json();
      await SecureStore.setItemAsync('jwtToken', token);
      console.log('Login successful');
    } catch (e) {
      setError('Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageToggleContainer}>
        <TouchableOpacity onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en')}>
          <Text style={styles.languageToggleText}>
            {i18n.language === 'en' ? 'TR' : 'EN'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>{t('login.username')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('login.username')}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>{t('login.password')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('login.password')}
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login.button')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  languageToggleContainer: {
    position: 'absolute',
    top: 80, 
    right: 40, 
    zIndex: 1,
  },
  languageToggleText: {
    color: 'lightblue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: 'white',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
