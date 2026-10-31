import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'GITHUB_OWNER',
      name: 'GITHUB_REPO',
    },
  },

  collections: {
    projektit: collection({
      label: 'Projektit',
      slugField: 'title',
      path: 'src/content/projektit/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Otsikko' },
          slug: { label: 'URL-slug' },
        }),
        year: fields.text({
          label: 'Vuosi',
          description: 'esim. 2024',
        }),
        tag: fields.select({
          label: 'Tyyppi',
          options: [
            { label: 'Projekti', value: 'Projekti' },
            { label: 'Jatkuva kehitys', value: 'Jatkuva kehitys' },
            { label: 'Konseptointi', value: 'Konseptointi' },
          ],
          defaultValue: 'Projekti',
        }),
        ingress: fields.text({
          label: 'Ingressi',
          description: 'Lyhyt kuvaus projektin etusivukorttiin ja projektin alkuun',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Kansikuva',
          directory: 'public/images/projektit',
          publicPath: '/images/projektit/',
        }),
        projectUrl: fields.url({
          label: 'Projektin URL',
          description: 'Linkki toteutettuun palveluun (valinnainen)',
          validation: { isRequired: false },
        }),
        body: fields.markdoc({
          label: 'Sisältö',
        }),
      },
    }),
  },
})
