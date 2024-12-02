// src/screens/PermissionsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import { Audio } from 'expo-av';

const PermissionsScreen = () => {
  const [permissions, setPermissions] = useState({
    camera: false,
    location: false,
    contacts: false,
    microphone: false,
  });

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setPermissions(prev => ({ ...prev, camera: status === 'granted' }));
    if (status !== 'granted') {
      Alert.alert('Uprawnienia', 'Dostęp do kamery jest potrzebny do robienia zdjęć.');
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissions(prev => ({ ...prev, location: status === 'granted' }));
    if (status !== 'granted') {
      Alert.alert('Uprawnienia', 'Dostęp do lokalizacji jest potrzebny do wyświetlania Twojej pozycji.');
    }
  };

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setPermissions(prev => ({ ...prev, contacts: status === 'granted' }));
    if (status !== 'granted') {
      Alert.alert('Uprawnienia', 'Dostęp do kontaktów jest potrzebny do wyświetlania Twoich kontaktów.');
    }
  };

  const requestMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    setPermissions(prev => ({ ...prev, microphone: status === 'granted' }));
    if (status !== 'granted') {
      Alert.alert('Uprawnienia', 'Dostęp do mikrofonu jest potrzebny do nagrywania dźwięku.');
    }
  };

  const handleCameraPress = async () => {
    if (!permissions.camera) await requestCameraPermission();
    if (permissions.camera) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        Alert.alert('Sukces', 'Zrobiono zdjęcie!');
      }
    } else {
      Alert.alert('Informacja', 'Brak dostępu do kamery.');
    }
  };

  const handleLocationPress = async () => {
    if (!permissions.location) await requestLocationPermission();
    if (permissions.location) {
      const location = await Location.getCurrentPositionAsync({});
      Alert.alert(
        'Lokalizacja',
        `Szerokość: ${location.coords.latitude}\nDługość: ${location.coords.longitude}`
      );
    } else {
      Alert.alert('Informacja', 'Brak dostępu do lokalizacji.');
    }
  };

  const handleContactsPress = async () => {
    if (!permissions.contacts) await requestContactsPermission();
    if (permissions.contacts) {
      const { data } = await Contacts.getContactsAsync();
      Alert.alert('Kontakty', `Znaleziono ${data.length} kontaktów.`);
    } else {
      Alert.alert('Informacja', 'Brak dostępu do kontaktów.');
    }
  };

  const handleMicrophonePress = async () => {
    if (!permissions.microphone) await requestMicrophonePermission();
    if (permissions.microphone) {
      Alert.alert('Mikrofon', 'Mikrofon jest gotowy do użycia.');
      // Tu możesz dodać funkcjonalność nagrywania dźwięku
    } else {
      Alert.alert('Informacja', 'Brak dostępu do mikrofonu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uprawnienia i Funkcje</Text>

      <TouchableOpacity style={styles.button} onPress={handleCameraPress}>
        <Text style={styles.buttonText}>Kamera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLocationPress}>
        <Text style={styles.buttonText}>Lokalizacja</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContactsPress}>
        <Text style={styles.buttonText}>Kontakty</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleMicrophonePress}>
        <Text style={styles.buttonText}>Mikrofon</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default PermissionsScreen;