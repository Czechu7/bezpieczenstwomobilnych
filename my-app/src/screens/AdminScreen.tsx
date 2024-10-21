import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
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
			<ScrollView style={styles.scrollView}>
				<View>
					<Text style={styles.text}>Lista użytkowników:</Text>
					{users.map((user, index) => (
						<View key={index} style={styles.userContainer}>
							<Text style={styles.userName}>{user.name}</Text>
							<Text style={styles.userEmail}>{user.email}</Text>
							<Text style={styles.userPassword}>{user.password}</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		marginLeft: 25,
		marginRight: 25,
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 40,
		marginBottom: 20,
	},
	userContainer: {
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	userEmail: {
		fontSize: 16,
		color: '#666',
	},
	userPassword: {
		fontSize: 16,
		color: '#666',
	},
	scrollView: {},
})

export default AdminScreen
