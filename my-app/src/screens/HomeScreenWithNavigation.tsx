import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text, ImageBackground } from 'react-native'

type RootStackParamList = {
	Home: undefined
	Login: undefined
	Register: undefined
	Admin: undefined
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type HomeScreenProps = {
	navigation: HomeScreenNavigationProp
	isLoggedIn: boolean
}

const HomeScreenWithNavigation: React.FC<HomeScreenProps> = ({ navigation, isLoggedIn }) => (
	// <ImageBackground source={require('../assets/splash.png')} style={styles.backgroundImage}>
	<View style={styles.screenContainer}>
		<Text style={styles.title}>Welcome to the Home Screen</Text>
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
					</>
				)}
			</View>
		</View>
	</View>
	// </ImageBackground>
)

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
	},
	screenContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay
	},
	title: {
		fontSize: 32,
		color: '#ffffff',
		marginBottom: 20,
		fontWeight: 'bold',
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color for the footer with transparency
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

export default HomeScreenWithNavigation
