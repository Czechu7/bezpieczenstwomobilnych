// src/config/db.js
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mobilne',
  password: 'admin',
})

export default pool