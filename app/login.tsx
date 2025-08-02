import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login.title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('login.username')}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder={t('login.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={t('login.button')} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
});
