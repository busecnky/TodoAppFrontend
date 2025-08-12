import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { darkColors, lightColors } from '../constants/Colors';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../i18n';

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const colors = isDark ? darkColors : lightColors;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(t("common.error"), t("common.fillAllFields"));
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const token = await response.text();
        await SecureStore.setItemAsync('jwtToken', token);
        router.push('/');
      } else {
        const errorText = await response.text();
        setError(errorText || t('login.loginFailed'));
      }
    } catch (e) {
      console.error('Login error:', e);
      setError(t('common.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topRightControls}>
        <TouchableOpacity style={styles.langButton} onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en')}>
          <Text style={[styles.controlText, { color: colors.text }]}>
            {i18n.language === 'en' ? 'TR' : 'EN'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={[styles.controlText]}>
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={20}
              color={isDark ? "white" : "black"}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: colors.text }]}>{t('common.username')}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        placeholder={t('common.username')}
        placeholderTextColor={colors.placeholder}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t('common.password')}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        placeholder={t('common.password')}
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={handleLogin} disabled={loading}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{loading ? t('common.loading') : t('common.login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => router.push('/register')}
      >
        <Text style={[styles.registerText, { color: colors.text }]}>
          {t('login.noAccount')} <Text style={[styles.registerLink, { color: colors.link }]}>{t('common.register')}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  topRightControls: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
  },
  langButton: {
    marginRight: 10,
  },
  themeButton: {},
  controlText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    marginBottom: 10,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontWeight: 'bold',
  },
});