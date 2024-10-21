import axios from 'axios'
import { API_URL } from '@env'

export interface User {
	email: string
	password: string
	name: string
}

export const getUsers = async (): Promise<User[] | null> => {
	try {
		const response = await axios.get(`${API_URL}/users`)
		return response.data
	} catch (error) {
		console.log('Error:', error)
		return null
	}
}
