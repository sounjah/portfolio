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

## GitHub-moodiin siirtyminen

1. Päivitä `keystatic.config.ts`:
   ```ts
   storage: {
     kind: 'github',
     repo: { owner: 'sinun-käyttäjänimi', name: 'portfolio-sonja' }
   }
   ```
2. Käynnistä `npm run dev` ja siirry `/keystatic`
3. Klikkaa "Login with GitHub" – luo GitHub App automaattisesti
4. Kopioi luodut env-muuttujat `.env`-tiedostoon (`.env.example` mallina)
