// src/services/auth/AuthService.ts
import axios from 'axios'

const API_URL = 'http://10.100.6.127:3000/v1'

export const login = async (email: string, password: string) => {
	try {
		const response = await axios.post(`${API_URL}/login`, { email, password })
		return response.data
	} catch (error) {
		console.log('Error:', error)
		return null
	}
}

export const register = async (name: string, email: string,password: string, otherData: any) => {
	try {
		const response = await axios.post(`${API_URL}/register`, { name, email, password, ...otherData })
		return response.data
	} catch (error) {
		return null
	}
}
