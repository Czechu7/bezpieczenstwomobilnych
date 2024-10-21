import express from 'express'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())

const users = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@doe.com',
		password: '123456',
	},
]

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'mobilne',
	password: 'admin',
})

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.post('/login', async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' })
	}

	try {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
		const user = result.rows[0]
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		res.status(200).json({ message: 'Login successful' })
	} catch (error) {
		res.status(500).json({ message: 'Error logging in', error: error.message })
	}
})

app.post('/register', async (req, res) => {
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
		res.status(201).json({ message: 'User registered', userId: result.rows[0].id })
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error: error.message })
	}
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
