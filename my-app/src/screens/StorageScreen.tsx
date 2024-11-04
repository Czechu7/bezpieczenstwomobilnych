// StorageScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageScreen = () => {
  const [inputData, setInputData] = useState('');
  const [dataList, setDataList] = useState<string[]>([]);

  const saveData = async () => {
    if (inputData.trim() === '') {
      Alert.alert('Błąd', 'Pole nie może być puste');
      return;
    }
    try {
      const storedData = await AsyncStorage.getItem('dataList');
      const dataArray = storedData ? JSON.parse(storedData) : [];
      dataArray.push(inputData);
      await AsyncStorage.setItem('dataList', JSON.stringify(dataArray));
      setDataList(dataArray);
      setInputData('');
      Alert.alert('Sukces', 'Dane zostały zapisane');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych');
    }
  };

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dataList');
      const dataArray = storedData ? JSON.parse(storedData) : [];
      setDataList(dataArray);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się odczytać danych');
    }
  };

  const deleteData = async (index: number) => {
    try {
      const updatedDataList = [...dataList];
      updatedDataList.splice(index, 1);
      await AsyncStorage.setItem('dataList', JSON.stringify(updatedDataList));
      setDataList(updatedDataList);
      Alert.alert('Sukces', 'Dane zostały usunięte');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się usunąć danych');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista Danych</Text>
      <TextInput
        style={styles.input}
        placeholder='Wpisz dane do zapisania'
        value={inputData}
        onChangeText={setInputData}
      />
      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Zapisz dane</Text>
      </TouchableOpacity>
      <FlatList
        data={dataList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteData(index)}>
              <Text style={styles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default StorageScreen;