import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import AdminScreen from './src/screens/AdminScreen'
import HomeScreenWithNavigation from './src/screens/HomeScreenWithNavigation'

type RootStackParamList = {
	Home: undefined
	Login: undefined
	Register: undefined
	Admin: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen name='Home' component={HomeScreenWithNavigation} />
				<Stack.Screen name='Login' component={LoginScreen} />
				<Stack.Screen name='Register' component={RegisterScreen} />
				<Stack.Screen name='Admin' component={AdminScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: '#f8f8f8', // Background color for the footer
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
		backgroundColor: '#6200ee', // Background color for the button
		marginHorizontal: 10,
	},
	buttonText: {
		color: '#ffffff', // Text color for contrast
		fontSize: 16,
		textAlign: 'center',
	},
})

export default App
