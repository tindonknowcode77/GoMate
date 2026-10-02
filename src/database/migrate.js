import { readConfig } from '../config/env.js'
import { createClient, initializeDatabase } from './mongo.js'

let client
try {
  client = createClient(readConfig())
  await client.connect()
  await initializeDatabase(client.db())
  console.log('MongoDB auth indexes are ready')
} catch {
  console.error('MongoDB initialization failed. Check MONGODB_URI and database access.')
  process.exitCode = 1
} finally {
  await client?.close()
}
