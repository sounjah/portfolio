import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic'
import { getSecret } from 'astro:env/server'
import config from '../../../../keystatic.config'

export const prerender = false

const handleRequest = async (context: any) => {
  const clientId = getSecret('KEYSTATIC_GITHUB_CLIENT_ID')
  const clientSecret = getSecret('KEYSTATIC_GITHUB_CLIENT_SECRET')
  const secret = getSecret('KEYSTATIC_SECRET')

  const handler = makeGenericAPIRouteHandler(
    { config, clientId, clientSecret, secret },
    { slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG' }
  )

  const { body, headers, status } = await handler(context.request)
  return new Response(body, { status, headers })
}

export const ALL = handleRequest
export const all = handleRequest
