import { SignJWT } from 'jose'
import { randomUUID } from 'node:crypto'
import { privateKey, publicJWK } from './keys.js'

export const createToken = async ({ user, clientId, scope }) => {
  return await new SignJWT({
    scope,
    sub: user.id,
    oid: user.id,
    name: user.name,
    email: user.username,
    roles: user.roles,
    nonce: randomUUID()
  })
    .setProtectedHeader({
      alg: 'RS256',
      typ: 'JWT',
      kid: publicJWK.kid
    })
    .setIssuedAt()
    .setIssuer('https://login.microsoftonline.com/tenantId/v2.0')
    .setAudience(clientId)
    .setExpirationTime('1h')
    .sign(privateKey)
}
