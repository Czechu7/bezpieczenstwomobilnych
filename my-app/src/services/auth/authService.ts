// src/services/auth/AuthService.ts
import axios from 'axios'
import { API_URL } from '@env'

export const login = async (email: string, password: string) => {
	try {
		const ENDPOINT = `${API_URL}/login`
		console.log('Trying to login: ', ENDPOINT, email, password)
		const response = await axios.post(ENDPOINT, { email, password })
		return response.data
	} catch (error) {
		console.log('Error:', error)
		return null
	}
}

export const register = async (name: string, email: string, password: string, otherData: any) => {
	try {
		const ENDPOINT = `${API_URL}/register`
		console.log('Trying to register: ', ENDPOINT, name, email, password, otherData)
		const response = await axios.post(ENDPOINT, { name, email, password, ...otherData })
		return response.data
	} catch (error) {
		console.log('Error:', error)
		return null
	}
}
