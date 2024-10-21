// src/models/userModel.js
import pool from '../config/db.js'

const createUserTable = async () => {
  const client = await pool.connect()
  try {
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      )
    `
    const res = await client.query(checkTableQuery)
    if (res.rows[0].exists) {
      console.log('Table Users exists')
    } else {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE,
          password VARCHAR(100)
        )
      `
      await client.query(createTableQuery)
      console.log('Table created successfully')
    }
  } catch (err) {
    console.error('Error creating table', err)
  } finally {
    client.release()
  }
}

export { createUserTable }