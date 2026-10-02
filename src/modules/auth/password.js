import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const derive = promisify(scrypt)
const options = { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 }

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const key = await derive(password, salt, 64, options)
  return `scrypt-v1$${salt}$${key.toString('hex')}`
}

export async function verifyPassword(password, encoded) {
  const [version, salt, hash] = encoded.split('$')
  if (version !== 'scrypt-v1' || !/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{128}$/.test(hash)) {
    return false
  }
  const actual = await derive(password, salt, 64, options)
  return timingSafeEqual(actual, Buffer.from(hash, 'hex'))
}

// Unknown accounts still perform the same expensive password derivation.
export const dummyPasswordHash = `scrypt-v1$${'0'.repeat(32)}$${'0'.repeat(128)}`
