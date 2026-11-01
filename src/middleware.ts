import { defineMiddleware } from 'astro:middleware'

// Astro v6 + @astrojs/cloudflare: ympäristömuuttujat haetaan cloudflare:workers-moduulista
let cfEnv: Record<string, string> | undefined

try {
  // Dynaaminen import jotta ei kaadu Node-ympäristössä (dev-palvelin)
  const mod = await import('cloudflare:workers' as string)
  cfEnv = mod.env
} catch {
  // Dev-ympäristössä cloudflare:workers ei ole saatavilla – käytetään process.env
  cfEnv = undefined
}

export const onRequest = defineMiddleware(async (_context, next) => {
  // Injektoidaan Cloudflare-ympäristömuuttujat process.env:iin
  // jotta @keystatic/core löytää ne
  if (cfEnv) {
    globalThis.process ??= { env: {} } as any
    globalThis.process.env ??= {}
    if (cfEnv.KEYSTATIC_GITHUB_CLIENT_ID)
      globalThis.process.env.KEYSTATIC_GITHUB_CLIENT_ID = cfEnv.KEYSTATIC_GITHUB_CLIENT_ID
    if (cfEnv.KEYSTATIC_GITHUB_CLIENT_SECRET)
      globalThis.process.env.KEYSTATIC_GITHUB_CLIENT_SECRET = cfEnv.KEYSTATIC_GITHUB_CLIENT_SECRET
    if (cfEnv.KEYSTATIC_SECRET)
      globalThis.process.env.KEYSTATIC_SECRET = cfEnv.KEYSTATIC_SECRET
  }

  return next()
})
