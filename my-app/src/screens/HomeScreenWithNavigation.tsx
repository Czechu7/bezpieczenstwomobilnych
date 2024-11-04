// HomeScreenWithNavigation.tsx

import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Admin: undefined;
  Storage: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  isLoggedIn: boolean;
  logoutHandler: () => void;
};

const HomeScreenWithNavigation: React.FC<HomeScreenProps> = ({ navigation, isLoggedIn, logoutHandler }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.title}>Witaj w aplikacji!</Text>
    <Text style={styles.title2}>
      {isLoggedIn ? 'Jesteś zalogowany.' : 'Zaloguj się bądź utwórz konto.'}
    </Text>
    <View style={styles.footer}>
      <View style={styles.buttonContainer}>
        {!isLoggedIn ? (
          <>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Storage')}>
              <Text style={styles.buttonText}>Storage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={logoutHandler}>
              <Text style={styles.buttonText}>Wyloguj</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  // Twoje style pozostają bez zmian
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 18,
    color: '#ffffff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#6200ee',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreenWithNavigation;