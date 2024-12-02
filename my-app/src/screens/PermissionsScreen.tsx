// src/screens/PermissionsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';

const PermissionsScreen = () => {
  const [hasPermissions, setHasPermissions] = useState({
    camera: false,
    location: false,
    contacts: false,
    microphone: false,
  });

  // Request permissions on mount
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: contactsStatus } = await Contacts.requestPermissionsAsync();
    const { status: microphoneStatus } = await ImagePicker.requestCameraPermissionsAsync();

    setHasPermissions({
      camera: cameraStatus === 'granted',
      location: locationStatus === 'granted',
      contacts: contactsStatus === 'granted',
      microphone: microphoneStatus === 'granted',
    });
  };

  const handleCameraPress = async () => {
    if (!hasPermissions.camera) {
      Alert.alert(
        'Wymagane uprawnienia',
        'Aby korzystać z kamery, musisz przyznać uprawnienia.',
        [
          { text: 'Anuluj', style: 'cancel' },
          { text: 'Przyznaj', onPress: checkPermissions }
        ]
      );
      return;
    }
    // Handle camera functionality
  };

  const handleLocationPress = async () => {
    if (!hasPermissions.location) {
      Alert.alert(
        'Wymagane uprawnienia',
        'Aby korzystać z lokalizacji, musisz przyznać uprawnienia.',
        [
          { text: 'Anuluj', style: 'cancel' },
          { text: 'Przyznaj', onPress: checkPermissions }
        ]
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      Alert.alert('Lokalizacja', `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać lokalizacji');
    }
  };

  const handleContactsPress = async () => {
    if (!hasPermissions.contacts) {
      Alert.alert(
        'Wymagane uprawnienia',
        'Aby korzystać z kontaktów, musisz przyznać uprawnienia.',
        [
          { text: 'Anuluj', style: 'cancel' },
          { text: 'Przyznaj', onPress: checkPermissions }
        ]
      );
      return;
    }

    try {
      const { data } = await Contacts.getContactsAsync();
      Alert.alert('Kontakty', `Znaleziono ${data.length} kontaktów`);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać kontaktów');
    }
  };

  const handleMicrophonePress = async () => {
    if (!hasPermissions.microphone) {
      Alert.alert(
        'Wymagane uprawnienia',
        'Aby korzystać z mikrofonu, musisz przyznać uprawnienia.',
        [
          { text: 'Anuluj', style: 'cancel' },
          { text: 'Przyznaj', onPress: checkPermissions }
        ]
      );
      return;
    }
    // Handle microphone functionality
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uprawnienia aplikacji</Text>
      
      <TouchableOpacity 
        style={[styles.button, !hasPermissions.camera && styles.buttonDisabled]}
        onPress={handleCameraPress}
      >
        <Text style={styles.buttonText}>
          Kamera {hasPermissions.camera ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, !hasPermissions.location && styles.buttonDisabled]}
        onPress={handleLocationPress}
      >
        <Text style={styles.buttonText}>
          Lokalizacja {hasPermissions.location ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, !hasPermissions.contacts && styles.buttonDisabled]}
        onPress={handleContactsPress}
      >
        <Text style={styles.buttonText}>
          Kontakty {hasPermissions.contacts ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, !hasPermissions.microphone && styles.buttonDisabled]}
        onPress={handleMicrophonePress}
      >
        <Text style={styles.buttonText}>
          Mikrofon {hasPermissions.microphone ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PermissionsScreen;