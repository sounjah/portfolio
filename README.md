# Sonja Kujansuu – Portfolio

Astro-pohjainen portfolio-sivusto Keystatic CMS -integraatiolla.

## Teknologia

- **[Astro](https://astro.build/)** – staattinen sivustogeneraattori (hybrid output)
- **[Keystatic CMS](https://keystatic.com/)** – sisällönhallinta GitHubin kautta
- **Markdoc** – sisältöformaatti projekteille
- **Vanilla CSS** – tyylit BEM-metodologialla

## Projektin rakenne

```
src/
├── components/        # Astro-komponentit (SiteHeader, SiteFooter)
├── content/
│   └── projektit/     # Projektiartikkelit (.mdoc-tiedostot)
├── layouts/           # BaseLayout.astro
├── pages/
│   ├── index.astro    # Etusivu
│   ├── tyot/
│   │   └── [slug].astro   # Projektin alasivu (dynaaminen)
│   ├── api/keystatic/ # Keystatic API-reitti
│   └── keystatic/     # Keystatic Admin UI -reitti
└── styles/
    └── global.css     # Globaalit tyylit
keystatic.config.ts    # Keystatic-konfiguraatio
```

## Kehitys

```bash
npm install
npm run dev
# Avaa http://localhost:4321
```

## Keystatic Admin UI

Paikallisessa kehityksessä: http://localhost:4321/keystatic

## Uuden projektin lisääminen

1. Avaa `/keystatic` selaimessa
2. Kirjaudu GitHub-tunnuksillasi
3. Luo uusi projekti "Projektit"-kokoelmaan
4. Täytä kentät: otsikko, vuosi, tyyppi, ingressi, kansikuva, URL, sisältö
5. Tallenna → luo automaattisesti PR GitHubiin

## Projektin kentät

| Kenttä | Kuvaus |
|--------|--------|
| `title` | Projektin otsikko (myös URL-slug) |
| `year` | Vuosi, esim. `2024` |
| `tag` | Tyyppi: Projekti / Jatkuva kehitys / Konseptointi |
| `ingress` | Lyhyt kuvaus (näkyy kortissa ja sivun alussa) |
| `coverImage` | Kansikuva (ladataan `public/images/projektit/`) |
| `projectUrl` | Linkki toteutettuun palveluun (valinnainen) |
| `body` | Pitkä sisältö Markdoc-muodossa |

## Keystatic GitHub-kirjautumisen käyttöönotto

Keystatic käyttää GitHub App -pohjaista OAuth-kirjautumista. GitHub App täytyy luoda
**kerran paikallisesti** ennen kuin Cloudflare Pages -deployment toimii.

### Vaihe 1 – Luo GitHub App paikallisesti

```bash
npm run dev
# Avaa http://localhost:4321/keystatic
```

Klikkaa **"Login with GitHub"** ja seuraa ohjeet GitHub App:n luomiseen.
Keystatic kirjoittaa automaattisesti `.env`-tiedostoon:

```
KEYSTATIC_GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxx
KEYSTATIC_GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
KEYSTATIC_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=portfolio-sonja-cms
```

### Vaihe 2 – Lisää credentials Cloudflare Pagesiin

Cloudflare Dashboard → Workers & Pages → `portfolio-sonja` →
**Settings → Environment variables → Production**

Lisää nämä muuttujat **Encrypt**-tyyppisinä:

| Muuttuja | Arvo |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | `.env`-tiedostosta |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `.env`-tiedostosta |
| `KEYSTATIC_SECRET` | `.env`-tiedostosta |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | `.env`-tiedostosta |

### Vaihe 3 – Lisää callback-URL GitHub App:iin

GitHub App:lla täytyy olla tuotantodomainisi callback-URL:

1. Mene https://github.com/settings/apps → valitse luotu app
2. **"Callback URL"** -kohtaan lisää:\
   `https://portfolio-sonja.kujansuu-sonja.workers.dev/api/keystatic/github/oauth/callback`
3. Tallenna

### Vaihe 4 – Deploy uudelleen

```bash
git add -A && git commit -m "feat: Keystatic env schema" && git push
```

Cloudflare Pages ajaa buildin automaattisesti. Sen jälkeen
https://portfolio-sonja.kujansuu-sonja.workers.dev/keystatic toimii.
