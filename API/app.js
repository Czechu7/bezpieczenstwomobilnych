import express from 'express'
import { createUserTable } from './models/userModel.js'
import { getUsers, register, login } from './controllers/userController.js'
import { getUsersSecured, registerSecured, loginSecured } from './controllers/userSecuredController.js'
import sanitizeBodyMiddleware from './middleware/sanitizeBodyMiddleware.js'
const app = express()
app.use(express.json())

createUserTable()

// First version with vulnerabilities
app.get('/v1/users', getUsers)
app.post('/v1/register', register)
app.post('/v1/login', login)

// Second version with improvements security
app.use(sanitizeBodyMiddleware)

app.get('/v2/users', getUsersSecured)
app.post('/v2/register', registerSecured)
app.post('/v2/login', loginSecured)

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
