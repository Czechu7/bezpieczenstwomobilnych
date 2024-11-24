// src/config/db.js
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
	user: 'postgres',
	host: 'db_bezpiecznemobilki',
	database: 'mobilne',
	password: 'admin',
	port: 5432,
})

export default pool
