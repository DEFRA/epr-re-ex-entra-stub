const callbackBaseUrl = process.env.CALLBACK_BASE_URL || 'http://localhost:3002'

export const clients = [
  {
    id: 'clientId',
    secret: 'test',
    redirectURIs: [`${callbackBaseUrl}/auth/callback`],
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'api://clientId/.default'
    ]
  }
]
