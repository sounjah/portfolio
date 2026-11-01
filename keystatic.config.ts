import { config, fields, collection, singleton } from '@keystatic/core'

const isProd = import.meta.env.PROD

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: 'sounjah',
          name: 'portfolio',
        },
      }
    : {
        kind: 'local',
      },

  ui: {
    brand: {
      name: 'Sonja Kujansuu – Portfolio',
    },
    navigation: {
      Etusivu: ['etusivu', 'introBody'],
      Sisältö: ['projektit'],
    },
  },

  // ── SINGLETON: Etusivun sisältö ──────────────────────────────────────
  singletons: {
    etusivu: singleton({
      label: 'Etusivu',
      path: 'src/content/etusivu',
      format: { data: 'json' },
      schema: {
        heroImage: fields.image({
          label: 'Hero-kuva',
          description: 'Etusivun suuri taustakuva',
          directory: 'public/images',
          publicPath: '/images/',
          validation: { isRequired: false },
        }),
        heroImageAlt: fields.text({
          label: 'Hero-kuvan alt-teksti',
          description: 'Kuvaileva teksti saavutettavuutta varten',
          defaultValue: 'Hero-kuva',
        }),
        introHeading: fields.text({
          label: 'Intro-otsikko',
          defaultValue: 'Welcome to my portfolio!',
        }),
        introSubheading: fields.text({
          label: 'Intro-alaotsikko',
          description: 'Esim. "UI/UX Designer & Design Systems Specialist"',
          defaultValue: '',
          validation: { isRequired: false },
        }),
        contactHeading: fields.text({
          label: 'Contact-otsikko',
          defaultValue: 'Contact',
        }),
        contactEmail: fields.text({
          label: 'Sähköpostiosoite',
          defaultValue: 'kujansuu.sonja@gmail.com',
        }),
        metaTitle: fields.text({
          label: 'Sivun otsikko (meta)',
          defaultValue: 'Sonja Kujansuu – Portfolio',
        }),
        metaDescription: fields.text({
          label: 'Sivun kuvaus (meta)',
          defaultValue: 'Sonja Kujansuun UX- ja palvelumuotoilun portfolio',
          multiline: true,
        }),
        projektiJarjestys: fields.array(
          fields.relationship({
            label: 'Projekti',
            collection: 'projektit',
          }),
          {
            label: 'Projektien järjestys',
            description: 'Raahaa projektit haluamaasi järjestykseen. Ylin näkyy etusivulla ensimmäisenä.',
            itemLabel: (props) => props.value ?? '(tyhjä)',
          },
        ),
      },
    }),

    // ── SINGLETON: Intro-teksti (markdoc-editori) ─────────────────────
    introBody: singleton({
      label: 'Intro-teksti',
      path: 'src/content/etusivu',
      format: { contentField: 'introBody' },
      schema: {
        introBody: fields.markdoc({
          label: 'Intro-teksti',
          description: 'Esittelyteksti etusivulle. Voit käyttää muotoiluja.',
        }),
      },
    }),
  },

  // ── COLLECTION: Projektit ────────────────────────────────────────────
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
        ingress: fields.text({
          label: 'Ingressi',
          description: 'Lyhyt kuvaus projektin etusivukorttiin ja projektin alkuun',
          multiline: true,
        }),
        body: fields.markdoc({
          label: 'Sisältö',
        }),
        coverImage: fields.image({
          label: 'Kansikuva',
          directory: 'public/images/projektit',
          publicPath: '/images/projektit/',
        }),
        year: fields.text({
          label: 'Vuosi',
          description: 'esim. 2024',
        }),
        tag: fields.select({
          label: 'Tyyppi',
          options: [
            { label: 'Project', value: 'Project' },
            { label: 'Continuous development', value: 'Continuous development' },
            { label: 'Concept', value: 'Concept' },
          ],
          defaultValue: 'Project',
        }),
        keywords: fields.array(
          fields.text({ label: 'Avainsana' }),
          {
            label: 'Avainsanat',
            description: 'Näkyvät projektin sivulla täginä kuvan alla',
            itemLabel: (props) => props.value,
          },
        ),
        projectUrl: fields.url({
          label: 'Projektin URL',
          description: 'Linkki toteutettuun palveluun (valinnainen)',
          validation: { isRequired: false },
        }),
        projectUrlLabel: fields.text({
          label: 'Painikkeen teksti',
          description: 'Teksti projektin URL-painikkeessa, esim. "Katso sivusto"',
          defaultValue: 'Katso sivusto',
          validation: { isRequired: false },
        }),
        cardOnly: fields.checkbox({
          label: 'Vain nostokortti',
          description: 'Ruksaa tämä jos projektilla ei ole omaa alasivua. Näkyy vain etusivun kortissa ilman painiketta.',
          defaultValue: false,
        }),
        hidden: fields.checkbox({
          label: 'Piilota etusivulta',
          description: 'Ruksattu projekti ei näy etusivun korttilistassa.',
          defaultValue: false,
        }),
      },
    }),
  },
})
