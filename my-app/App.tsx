// App.tsx

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminScreen from './src/screens/AdminScreen';
import StorageScreen from './src/screens/StorageScreen';
import HomeScreenWithNavigation from './src/screens/HomeScreenWithNavigation';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Admin: undefined;
  Storage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sprawdź stan zalogowania przy uruchomieniu aplikacji
  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value === 'true') {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const onLoginHandler = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('isLoggedIn', 'true');
  };

  const logoutHandler = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('isLoggedIn');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home'>
          {props => (
            <HomeScreenWithNavigation
              {...props}
              isLoggedIn={isLoggedIn}
              logoutHandler={logoutHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='Login'>
          {props => (
            <LoginScreen
              {...props}
              setIsLoggedIn={onLoginHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Admin' component={AdminScreen} />
        <Stack.Screen name='Storage' component={StorageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;