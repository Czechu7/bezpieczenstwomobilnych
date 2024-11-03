import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { register } from '../services/auth/authService'

const RegisterScreen = () => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [otherData, setOtherData] = useState({})

	// Function to validate email format
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const handleRegister = async () => {
		// Validate inputs
		if (!name || !email || !password) {
			Alert.alert('Błąd', 'Wszystkie pola są wymagane')
			return
		}

		if (!isValidEmail(email)) {
			Alert.alert('Błąd', 'Wprowadź poprawny adres email')
			return
		}

		if (password.length < 6) {
			Alert.alert('Błąd', 'Hasło musi mieć co najmniej 6 znaków')
			return
		}

		// Proceed with registration if validation passes
		const res = await register(name, email, password, otherData)
		if (res) {
			Alert.alert('Register', 'Zarejestrowano się pomyślnie')
		} else {
			Alert.alert('Register', 'Nie udało się zarejestrować')
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.registerContainer}>
				<Text style={styles.label}>Register:</Text>
				<TextInput style={styles.input} placeholder='Wpisz nazwę użytkownika' value={name} onChangeText={setName} />
				<TextInput
					style={styles.input}
					placeholder='Wpisz adres email'
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
				/>
				<Text style={styles.label}>Hasło:</Text>
				<TextInput
					style={styles.input}
					placeholder='Wpisz hasło'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<Button title='Zarejestruj' onPress={handleRegister} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
	},
	registerContainer: {
		width: '80%',
		padding: 20,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	input: {
		height: 40,
		borderColor: '#cccccc',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
})

export default RegisterScreen
