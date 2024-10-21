import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		console.log('Email:', email)
		console.log('Password:', password)
		Alert.alert('Login', 'Login successful')
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text>Open up App.tsx to start working on your app!</Text>
				<StatusBar style='auto' />
				<TextInput onChangeText={setEmail} value={email} placeholder='Wpisz email' />
				<TextInput onChangeText={setPassword} value={password} secureTextEntry placeholder='Wpisz haslo' />
				<Button title='Zaloguj' onPress={handleLogin} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
