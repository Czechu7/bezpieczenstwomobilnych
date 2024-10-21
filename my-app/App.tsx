import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Button, View, Text, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/loginScreen';
import RegisterScreen from './src/screens/registerScreen';
import HomeScreen from './src/screens/homeScreen';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreenWithNavigation: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={styles.screenContainer}>
    <Text>Home Screen</Text>
    <Button title="Login" onPress={() => navigation.navigate('Login')} />
    <Button title="Register" onPress={() => navigation.navigate('Register')} />
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreenWithNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;