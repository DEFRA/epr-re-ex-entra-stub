const stubUrl = process.env.STUB_URL || 'http://localhost:3010'

export const oidcConfig = {
  token_endpoint: `${stubUrl}/token`,
  token_endpoint_auth_methods_supported: [
    'client_secret_post',
    'private_key_jwt',
    'client_secret_basic'
  ],
  jwks_uri: `${stubUrl}/jwks`,
  response_modes_supported: ['query', 'fragment', 'form_post'],
  subject_types_supported: ['pairwise'],
  id_token_signing_alg_values_supported: ['RS256'],
  response_types_supported: [
    'code',
    'id_token',
    'code id_token',
    'id_token token'
  ],
  scopes_supported: ['openid', 'profile', 'email', 'offline_access'],
  issuer: `${stubUrl}/tenantId/v2.0`,
  request_uri_parameter_supported: false,
  userinfo_endpoint: 'https://graph.microsoft.com/oidc/userinfo',
  authorization_endpoint: `${stubUrl}/authorize`,
  device_authorization_endpoint: `${stubUrl}/devicecode`,
  http_logout_supported: true,
  frontchannel_logout_supported: true,
  end_session_endpoint: `${stubUrl}/logout`,
  claims_supported: [
    'sub',
    'iss',
    'cloud_instance_name',
    'cloud_instance_host_name',
    'cloud_graph_host_name',
    'msgraph_host',
    'aud',
    'exp',
    'iat',
    'auth_time',
    'acr',
    'nonce',
    'preferred_username',
    'name',
    'tid',
    'ver',
    'at_hash',
    'c_hash',
    'email'
  ],
  kerberos_endpoint: `${stubUrl}/tenantId/kerberos`,
  tenant_region_scope: 'EU',
  cloud_instance_name: 'microsoftonline.com',
  cloud_graph_host_name: 'graph.windows.net',
  msgraph_host: 'graph.microsoft.com',
  rbac_url: 'https://pas.windows.net'
}
