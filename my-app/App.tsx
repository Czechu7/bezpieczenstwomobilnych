import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import HomeScreen from './src/screens/HomeScreen'
import AdminScreen from './src/screens/AdminScreen'
type RootStackParamList = {
	Home: undefined
	Login: undefined
	Register: undefined
	Admin: undefined
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type HomeScreenProps = {
	navigation: HomeScreenNavigationProp
}

const Stack = createStackNavigator<RootStackParamList>()

const HomeScreenWithNavigation: React.FC<HomeScreenProps> = ({ navigation }) => (
	<View style={styles.screenContainer}>
		<Text>Home Screen</Text>
		<View style={styles.footer}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
					<Text style={styles.buttonText}>Admin</Text>
				</TouchableOpacity>
			</View>
		</View>
	</View>
)

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
