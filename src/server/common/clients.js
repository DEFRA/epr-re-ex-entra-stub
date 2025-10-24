export const clients = [
  {
    id: 'clientId',
    secret: 'test',
    redirectURIs: ['http://localhost:3002/auth/callback'],
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'api://clientId/.default'
    ]
  }
]
