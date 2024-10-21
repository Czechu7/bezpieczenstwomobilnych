// src/controllers/userController.js
import bcrypt from 'bcrypt'
import pool from '../config/db.js'

const getUsersSecured = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM users')
		res.json(result.rows)
	} catch (err) {
		console.error('Error fetching users', err)
		res.status(500).json({ message: 'Server error', status: 500 })
	}
}

const loginSecured = async (req, res) => {
	const { email, password } = req.body
	console.log(email, password)
	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required', status: 400 })
	}

	try {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
		console.log(result)
		const user = result.rows[0]
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials', status: 401 })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials', status: 401 })
		}

		res.status(200).json({ message: 'Login successful', status: 200 })
	} catch (error) {
		res.status(500).json({ message: 'Error logging in', error: error.message, status: 500 })
	}
}

const registerSecured = async (req, res) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Name, email, and password are required' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	try {
		const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [
			name,
			email,
			hashedPassword,
		])
		res.status(201).json({ message: 'User registered', userId: result.rows[0].id, status: 201 })
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error: error.message, status: 500 })
	}
}

export { getUsersSecured, loginSecured, registerSecured }
