import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightColors, darkColors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export default function RegisterScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const colors = isDark ? darkColors : lightColors;

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleRegister = async () => {
        if (!username || !email || !password) {
            Alert.alert(t("common.error"), t("common.fillAllFields"));
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                Alert.alert(t('common.success'), t('register.registrationSuccess'));
                router.push('/login');
            } else {
                const errorText = await response.text();
                setError(errorText || t('register.registrationFailed'));
            }
        } catch (e) {
            console.error('Registration error:', e);
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
                    <Text style={[styles.controlText, { color: colors.link }]}>
                        <Ionicons
                            name={isDark ? "sunny-outline" : "moon-outline"}
                            size={20}
                            color={isDark ? "white" : "black"}
                        />
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>{t('common.register')}</Text>

            <Text style={[styles.label, { color: colors.text }]}>{t('common.username')}</Text>
            <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                placeholder={t('common.username')}
                placeholderTextColor={colors.placeholder}
                value={username}
                onChangeText={setUsername}
            />

            <Text style={[styles.label, { color: colors.text }]}>{t('common.email')}</Text>
            <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                placeholder={t('common.email')}
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
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

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={handleRegister} disabled={loading}>
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                    {loading ? t('common.loading') : t('common.register')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => router.push('/login')}
            >
                <Text style={[styles.loginText, { color: colors.text }]}>
                    {t('register.alreadyHaveAccount')} <Text style={[styles.loginLink, { color: colors.link }]}>{t('common.login')}</Text>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    loginContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
    },
    loginLink: {
        fontWeight: 'bold',
    },
});