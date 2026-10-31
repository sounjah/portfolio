import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// ── Projektikokoelma ──────────────────────────────────────────────────
const projektit = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projektit' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    tag: z.string(),
    ingress: z.string(),
    keywords: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    projectUrl: z.string().url().optional(),
    projectUrlLabel: z.string().optional(),
    cardOnly: z.boolean().optional(),
  }),
})

// Etusivun data luetaan suoraan Keystatic Reader API:lla (src/pages/index.astro)
// eikä Astro content collections -järjestelmän kautta.

export const collections = { projektit }
