import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Contacts from 'react-native-contacts';
import Geolocation from 'react-native-geolocation-service';
import AudioRecord from 'react-native-audio-record';

const PermissionsScreen = () => {
  const [permissionsStatus, setPermissionsStatus] = useState({
    camera: false,
    location: false,
    contacts: false,
    microphone: false,
  });

  const requestAndroidPermission = async (permission: string, title: string, message: string) => {
    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: title,
        message: message,
        buttonNeutral: "Zapytaj później",
        buttonNegative: "Odmów",
        buttonPositive: "OK"
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const checkPermissions = async () => {
    const cameraGranted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      "Dostęp do aparatu",
      "Aplikacja potrzebuje dostępu do aparatu"
    );

    const locationGranted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      "Dostęp do lokalizacji",
      "Aplikacja potrzebuje dostępu do lokalizacji"
    );

    const contactsGranted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      "Dostęp do kontaktów",
      "Aplikacja potrzebuje dostępu do kontaktów"
    );

    const microphoneGranted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      "Dostęp do mikrofonu",
      "Aplikacja potrzebuje dostępu do mikrofonu"
    );

    setPermissionsStatus({
      camera: cameraGranted,
      location: locationGranted,
      contacts: contactsGranted,
      microphone: microphoneGranted,
    });
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const handleCameraPress = async () => {
    const granted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      "Dostęp do aparatu",
      "Aplikacja potrzebuje dostępu do aparatu"
    );

    if (granted) {
      launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      }, (response) => {
        if (response.didCancel) {
          Alert.alert('Anulowano', 'Zrobienie zdjęcia zostało anulowane');
        } else if (response.errorCode) {
          Alert.alert('Błąd', response.errorMessage || 'Wystąpił błąd aparatu');
        } else if (response.assets && response.assets[0]) {
          Alert.alert('Sukces', 'Zdjęcie zostało zrobione!');
        }
      });
    }
  };

  const handleLocationPress = async () => {
    const granted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      "Dostęp do lokalizacji",
      "Aplikacja potrzebuje dostępu do lokalizacji"
    );

    if (granted) {
      Geolocation.getCurrentPosition(
        (position) => {
          Alert.alert(
            'Lokalizacja',
            `Szerokość: ${position.coords.latitude}\nDługość: ${position.coords.longitude}`
          );
        },
        (error) => Alert.alert('Błąd', error.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  const handleContactsPress = async () => {
    const granted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      "Dostęp do kontaktów",
      "Aplikacja potrzebuje dostępu do kontaktów"
    );

    if (granted) {
      try {
        const contacts = await Contacts.getAll();
        Alert.alert('Kontakty', `Znaleziono ${contacts.length} kontaktów`);
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się pobrać kontaktów');
      }
    }
  };

  const handleMicrophonePress = async () => {
    const granted = await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      "Dostęp do mikrofonu", 
      "Aplikacja potrzebuje dostępu do mikrofonu"
    );

    if (granted) {
      try {
        await AudioRecord.init({
          sampleRate: 16000,
          channels: 1,
          bitsPerSample: 16,
          audioSource: 6,
          wavFile: 'test.wav'
        });
        
        await AudioRecord.start();
        Alert.alert('Nagrywanie', 'Rozpoczęto nagrywanie', [
          {
            text: 'Stop',
            onPress: async () => {
              const audioFile = await AudioRecord.stop();
              Alert.alert('Sukces', `Nagranie zapisane: ${audioFile}`);
            },
          },
        ]);
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się rozpocząć nagrywania');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uprawnienia Aplikacji</Text>
      
      <TouchableOpacity 
        style={[styles.button, !permissionsStatus.camera && styles.buttonDisabled]} 
        onPress={handleCameraPress}
      >
        <Text style={styles.buttonText}>
          Aparat {permissionsStatus.camera ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, !permissionsStatus.location && styles.buttonDisabled]} 
        onPress={handleLocationPress}
      >
        <Text style={styles.buttonText}>
          Lokalizacja {permissionsStatus.location ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, !permissionsStatus.contacts && styles.buttonDisabled]} 
        onPress={handleContactsPress}
      >
        <Text style={styles.buttonText}>
          Kontakty {permissionsStatus.contacts ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, !permissionsStatus.microphone && styles.buttonDisabled]} 
        onPress={handleMicrophonePress}
      >
        <Text style={styles.buttonText}>
          Mikrofon {permissionsStatus.microphone ? '✓' : '✗'}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  buttonEnabled: {
    backgroundColor: '#4CAF50',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default PermissionsScreen;