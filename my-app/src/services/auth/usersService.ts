import axios from 'axios'

const API_URL = 'http://172.20.10.2:3000/v1'
// const API_URL = 'http://192.168.1.174:3000/v1'

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
