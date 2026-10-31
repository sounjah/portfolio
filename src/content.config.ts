import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projektit = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projektit' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    tag: z.string(),
    ingress: z.string(),
    coverImage: z.string().optional(),
    projectUrl: z.string().url().optional(),
  }),
})

export const collections = { projektit }
