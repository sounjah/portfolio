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
      Etusivu: ['etusivu'],
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
        introBody: fields.array(
          fields.text({
            label: 'Kappale',
            multiline: true,
          }),
          {
            label: 'Intro-tekstikappaleet',
            description: 'Jokainen rivi on oma kappaleensa',
            itemLabel: (props) => props.value.slice(0, 60) + (props.value.length > 60 ? '…' : ''),
          },
        ),
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
        order: fields.number({
          label: 'Järjestys',
          description: 'Pienin numero näytetään ensin. Esim. 1, 2, 3...',
          defaultValue: 99,
          validation: { isRequired: true, min: 1 },
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
        keywords: fields.array(
          fields.text({ label: 'Avainsana' }),
          {
            label: 'Avainsanat',
            description: 'Näkyvät projektin sivulla täginä kuvan alla',
            itemLabel: (props) => props.value,
          },
        ),
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
        body: fields.markdoc({
          label: 'Sisältö',
        }),
      },
    }),
  },
})
