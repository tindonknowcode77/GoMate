import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createGoogleVerifier } from '../src/modules/auth/google.js'

test('Google verifier requires configuration and passes audience to official verification', async () => {
  await assert.rejects(createGoogleVerifier('')('token'), { status: 503 })
  const verify = createGoogleVerifier('client-id', {
    async verifyIdToken(options) {
      assert.deepEqual(options, { idToken: 'signed-token', audience: 'client-id' })
      return { getPayload: () => ({ sub: 'google-123', email: 'User@gmail.com', email_verified: true, name: ' User ' }) }
    },
  })
  assert.deepEqual(await verify('signed-token'), { googleSub: 'google-123', email: 'user@gmail.com', name: 'User' })
})

test('Google verifier rejects failed verification and incomplete/unverified identities', async () => {
  const rejected = createGoogleVerifier('client-id', { async verifyIdToken() { throw new Error('bad signature/audience/expiry') } })
  await assert.rejects(rejected('bad-token'), { status: 401 })
  for (const payload of [undefined, {}, { sub: '123', email: 'a@gmail.com', email_verified: false },
    { sub: '123', email: 'invalid', email_verified: true }]) {
    const verify = createGoogleVerifier('client-id', { async verifyIdToken() { return { getPayload: () => payload } } })
    await assert.rejects(verify('token'), { status: 401 })
  }
})
