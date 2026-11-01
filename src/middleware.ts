import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  // Cloudflare Workers -ympäristössä ympäristömuuttujat ovat context.locals.runtime.env:ssä.
  // @keystatic/core käyttää process.env:ä, joten injektoidaan ne sinne.
  const env = (context.locals as any)?.runtime?.env

  if (env) {
    globalThis.process ??= { env: {} } as any
    globalThis.process.env ??= {}
    if (env.KEYSTATIC_GITHUB_CLIENT_ID)
      globalThis.process.env.KEYSTATIC_GITHUB_CLIENT_ID = env.KEYSTATIC_GITHUB_CLIENT_ID
    if (env.KEYSTATIC_GITHUB_CLIENT_SECRET)
      globalThis.process.env.KEYSTATIC_GITHUB_CLIENT_SECRET = env.KEYSTATIC_GITHUB_CLIENT_SECRET
    if (env.KEYSTATIC_SECRET)
      globalThis.process.env.KEYSTATIC_SECRET = env.KEYSTATIC_SECRET
  }

  return next()
})
