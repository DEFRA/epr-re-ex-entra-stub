const callbackBaseUrl = process.env.CALLBACK_BASE_URL || 'http://localhost:3002'
const callbackEprUrl = process.env.CALLBACK_EPR_URL || 'http://localhost:3000'

export const clients = [
  {
    id: 'clientId',
    secret: 'test',
    redirectURIs: [
      `${callbackBaseUrl}/auth/callback`,
      `${callbackEprUrl}/auth/callback/entra`
    ],
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'api://clientId/.default'
    ],
    postLogoutRedirectURIs: [`${callbackBaseUrl}/`, `${callbackEprUrl}/`]
  }
]
