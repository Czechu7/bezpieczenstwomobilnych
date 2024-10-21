import express from 'express'
import { createUserTable } from './models/userModel.js'
import { getUsers, register, login } from './controllers/userController.js'

const app = express()
app.use(express.json())

createUserTable()
app.get('/v1/users', getUsers)
app.post('/v1/register', register)
app.post('/v1/login', login)

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
