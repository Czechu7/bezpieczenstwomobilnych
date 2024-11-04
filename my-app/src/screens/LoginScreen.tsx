// LoginScreen.tsx

import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../services/auth/authService';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
};

interface LoginScreenProps {
  setIsLoggedIn: () => void;
  navigation: StackNavigationProp<RootStackParamList>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsLoggedIn, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Adres email i hasło nie mogą być puste');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Błąd', 'Wprowadź poprawny adres email');
      return;
    }

    const res = await login(email, password);
    if (res) {
      Alert.alert('Login', 'Zalogowano się pomyślnie');
      await setIsLoggedIn();
      navigation.navigate('Home');
    } else {
      Alert.alert('Login', 'Nieprawidłowe logowanie');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Login:</Text>
        <TextInput
          style={styles.input}
          placeholder='Wpisz adres email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />
        <Text style={styles.label}>Hasło:</Text>
        <TextInput
          style={styles.input}
          placeholder='Wpisz hasło'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title='Zaloguj' onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Style pozostają bez zmian
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;