// app.js
import express from 'express'
import https from 'https'
import http from 'http'
import fs from 'fs'
import { createUserTable } from './models/userModel.js'
import { getUsers, register, login } from './controllers/userController.js'
import { getUsersSecured, registerSecured, loginSecured } from './controllers/userSecuredController.js'
import sanitizeBodyMiddleware from './middleware/sanitizeBodyMiddleware.js'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
// Konfiguracja SSL
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minut
	max: 100 // limit 100 zapytań na IP
  })
  app.use(limiter)
// Middleware do przekierowania HTTP -> HTTPS
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

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

// Utworzenie serwerów HTTP i HTTPS
http.createServer(app).listen(80);
https.createServer(options, app).listen(443, () => {
  console.log('Server is running on ports 80 (HTTP) and 443 (HTTPS)')
})