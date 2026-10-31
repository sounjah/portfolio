import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import node from '@astrojs/node'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  output: 'server',
  adapter: isProduction
    ? cloudflare({ mode: 'directory' })
    : node({ mode: 'standalone' }),
  integrations: [react(), markdoc(), keystatic()],

  vite: {
    optimizeDeps: {
      include: [
        '@keystatic/core',
        '@keystatic/core/ui',
      ],
    },
    ssr: {
      noExternal: ['@keystatic/core', '@keystatic/astro'],
    },
  },

  // Keystatic lukee nämä getSecret()-funktiolla astro:env/server-moduulista.
  // Ilman tätä skeemaa getSecret() ei palauta arvoja Cloudflare Workers -ympäristössä.
  env: {
    schema: {
      KEYSTATIC_GITHUB_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      KEYSTATIC_GITHUB_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      KEYSTATIC_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
})
