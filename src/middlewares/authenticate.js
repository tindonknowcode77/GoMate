import { HttpError } from '../common/http-error.js'
import { hashToken, publicUser } from '../modules/auth/token.js'

export function authenticate(repository) {
  return async (req, res, next) => {
    res.set('Cache-Control', 'no-store')
    const match = /^Bearer ([A-Za-z0-9_-]{43})$/i.exec(req.get('authorization') ?? '')
    if (!match) throw new HttpError(401, 'Authentication required')
    const tokenHash = hashToken(match[1])
    const user = await repository.findSessionUser(tokenHash)
    if (!user) throw new HttpError(401, 'Invalid or expired token')
    req.auth = { user: publicUser(user), tokenHash }
    next()
  }
}
