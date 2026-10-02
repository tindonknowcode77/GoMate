import { OAuth2Client } from 'google-auth-library'
import { HttpError } from '../../common/http-error.js'

export function createGoogleVerifier(clientId, client = new OAuth2Client()) {
  return async idToken => {
    if (!clientId) throw new HttpError(503, 'Google login is not configured')
    let payload
    try {
      const ticket = await client.verifyIdToken({ idToken, audience: clientId })
      payload = ticket.getPayload()
    } catch {
      throw new HttpError(401, 'Invalid or expired Google ID token')
    }
    if (!payload || typeof payload.sub !== 'string' || !payload.sub ||
        payload.email_verified !== true || typeof payload.email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 254) {
      throw new HttpError(401, 'Verified Google email required')
    }
    return {
      googleSub: payload.sub,
      email: payload.email.trim().toLowerCase(),
      name: typeof payload.name === 'string' && payload.name.trim()
        ? payload.name.trim().slice(0, 100) : payload.email.split('@')[0],
    }
  }
}
