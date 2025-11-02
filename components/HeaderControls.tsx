import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@/contexts/ThemeContext';
import { darkColors, lightColors } from '@/constants/Colors';

export default function HeaderControls() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const colors = isDark ? darkColors : lightColors;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en')}>
        <Text style={[styles.text, { color: colors.text }]}>
          {i18n.language === 'en' ? 'TR' : 'EN'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={26}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    zIndex: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
