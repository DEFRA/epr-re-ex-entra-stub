import Boom from '@hapi/boom'
import { randomUUID } from 'node:crypto'
import { authCodes } from '../common/auth-codes.js'
import { clients } from '../common/clients.js'
import { users } from '../common/users.js'
import { statusCodes } from '../common/constants/status-codes.js'
import { oidcConfig } from '../common/oidc-config.js'

const sessions = {}

const assertIsValidQuery = (query) => {
  const client = clients.find((c) => c.id === query.client_id)

  if (!client) {
    throw Boom.badRequest('Invalid client_id')
  }

  if (!client.redirectURIs.includes(query.redirect_uri)) {
    throw Boom.badRequest('Invalid redirect_uri')
  }

  if (typeof query.scope !== 'string') {
    throw Boom.badRequest('Invalid scope parameter type')
  }

  console.log('Scopes: ' + query.scope)
  for (const scope of query.scope.split(' ')) {
    if (!client.scopes.includes(scope)) {
      throw Boom.badRequest(`Invalid scope: ${scope}`)
    }
  }

  if (!query.state) {
    throw Boom.badRequest('Missing state parameter')
  }
}

export const authorizeGet = {
  method: 'GET',
  path: '/authorize',
  handler(request, h) {
    assertIsValidQuery(request.query)

    if (request.query.response_type !== 'code') {
      throw Boom.badRequest('Unsupported response_type')
    }

    const session = sessions[request.state.sessionId]

    if (session) {
      const code = randomUUID()

      authCodes[code] = {
        clientId: request.query.client_id,
        scope: request.query.scope,
        user: session.user
      }

      return h.redirect(
        `${request.query.redirect_uri}?code=${code}&state=${request.query.state}`
      )
    }

    return h.view('views/authorize', {
      pageTitle: 'Login',
      heading: 'Login'
    })
  }
}

export const logoutGet = {
  method: 'GET',
  path: '/{clientId}/logout',
  handler(request, h) {
    const { params } = request
    const { clientId } = params

    const client = clients.find((c) => c.id === clientId)

    if (!client) {
      throw Boom.badRequest('Invalid client_id')
    }

    const validatedRedirectUri = client.postLogoutRedirectURIs.find(
      (uri) => uri === request.query.post_logout_redirect_uri
    )

    if (!validatedRedirectUri) {
      throw Boom.badRequest('Invalid post_logout_redirect_uri')
    }

    return h.redirect(validatedRedirectUri)
  }
}

export const oidcConfigGet = {
  method: 'GET',
  path: '/.well-known/openid-configuration',
  handler(_request, h) {
    console.log(oidcConfig)
    return h.response(oidcConfig).code(statusCodes.ok)
  }
}

export const authorizePost = {
  method: 'POST',
  path: '/authorize',
  handler(request, h) {
    assertIsValidQuery(request.query)

    const { username, password } = request.payload

    console.log('Username: ' + username)

    const user = users.find(
      (u) => u.username === username && u.password === password
    )

    if (!user) {
      return h.view('views/authorize', {
        pageTitle: 'Login',
        heading: 'Login',
        validationErrors: [
          {
            text: 'Invalid email or password',
            href: '#username'
          }
        ]
      })
    }

    const sessionId = randomUUID()
    const code = randomUUID()

    sessions[sessionId] = { user }

    authCodes[code] = {
      clientId: request.query.client_id,
      scope: request.query.scope,
      user
    }

    h.state('sessionId', sessionId)

    return h.redirect(
      `${request.query.redirect_uri}?code=${code}&state=${request.query.state}`
    )
  }
}
