import { defineMiddleware } from 'astro:middleware'
import { getSecret } from 'astro:env/server'

export const onRequest = defineMiddleware(async (_context, next) => {
  // Injektoidaan Keystatic-ympäristömuuttujat process.env:iin.
  // getSecret() toimii sekä Cloudflare Workers- että Node-ympäristössä
  // koska astro.config.mjs:ssä on määritelty env-skeema näille muuttujille.
  globalThis.process ??= { env: {} } as any
  globalThis.process.env ??= {}

  const clientId = getSecret('KEYSTATIC_GITHUB_CLIENT_ID')
  const clientSecret = getSecret('KEYSTATIC_GITHUB_CLIENT_SECRET')
  const secret = getSecret('KEYSTATIC_SECRET')

  if (clientId) globalThis.process.env.KEYSTATIC_GITHUB_CLIENT_ID = clientId
  if (clientSecret) globalThis.process.env.KEYSTATIC_GITHUB_CLIENT_SECRET = clientSecret
  if (secret) globalThis.process.env.KEYSTATIC_SECRET = secret

  return next()
})
