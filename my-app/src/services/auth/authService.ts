// src/services/auth/AuthService.ts
import axios from 'axios'
import { API_URL } from '@env'

// const API_URL = 'http://172.20.10.2:3000/v1'
// const API_URL = 'http://192.168.1.174:3000/v1'

export const login = async (email: string, password: string) => {
	try {
		console.log('Trying to login')
		const response = await axios.post(`${API_URL}/login`, { email, password })
		return response.data
	} catch (error) {
		console.log('Error:', error)
		return null
	}
}

export const register = async (name: string, email: string, password: string, otherData: any) => {
	try {
		const response = await axios.post(`${API_URL}/register`, { name, email, password, ...otherData })
		return response.data
	} catch (error) {
		return null
	}
}
