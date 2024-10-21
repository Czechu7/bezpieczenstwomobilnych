// src/models/userModel.js
import pool from '../config/db.js'

const createUserTable = async () => {
  const client = await pool.connect()
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      )
    `
    await client.query(queryText)
    console.log('Table created successfully')
  } catch (err) {
    console.error('Error creating table', err)
  } finally {
    client.release()
  }
}

export { createUserTable }