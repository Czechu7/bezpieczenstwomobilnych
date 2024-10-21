import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { login, register } from './src/services/auth/authService'

export default function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async () => {
		console.log('Email:', email)
		console.log('Password:', password)
		const res = await login(email, password)
		console.log('Response:', res)
		if (res.status === 200) {
			Alert.alert('Login', 'Login successful')
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.loginContainer}>
				<Text style={styles.label}>Login:</Text>
				<TextInput style={styles.input} placeholder='Wpisz adres email' value={email} onChangeText={setEmail} />
				<Text style={styles.label}>Hasło:</Text>
				<TextInput
					style={styles.input}
					placeholder='Wpisz hasło'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<Button title='Zaloguj' onPress={handleLogin} />
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
	loginContainer: {
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
