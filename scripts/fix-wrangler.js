// Poistaa ASSETS-bindingin generoiduista wrangler.json-tiedostoista.
// ASSETS on kielletty nimi Cloudflare Pages -projekteissa mutta
// @astrojs/cloudflare lisää sen automaattisesti.
import { existsSync, readFileSync, writeFileSync } from 'fs'
const fs = { existsSync, readFileSync, writeFileSync }

const files = [
  'dist/server/wrangler.json',
  'dist/server/.prerender/wrangler.json',
]

for (const file of files) {
  if (!fs.existsSync(file)) continue
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (data.assets) {
    delete data.assets
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    console.log(`Removed assets binding from ${file}`)
  }
}
