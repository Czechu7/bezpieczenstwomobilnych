import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { getUsers, User } from '../services/auth/usersService'

const AdminScreen = () => {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			const data = await getUsers()
			if (data) {
				setUsers(data)
			}
		}
		fetchUsers()
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.text}>Admin Screen!</Text>
				{users.map((user, index) => (
					<Text key={index} style={styles.userText}>
						{user.name}
					</Text>
				))}
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
	text: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	userText: {
		fontSize: 18,
		marginTop: 10,
	},
})

export default AdminScreen
