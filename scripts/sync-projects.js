import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs'

const mdocPath = 'src/content/etusivu.mdoc'
const projektitDir = 'src/content/projektit'

if (!existsSync(mdocPath)) {
  console.log('sync-projects: etusivu.mdoc ei löydy, ohitetaan')
  process.exit(0)
}

const mdocContent = readFileSync(mdocPath, 'utf8')

// Luetaan projektiJarjestys frontmatterista
const fmMatch = mdocContent.match(/^---\n([\s\S]*?)\n---/)
const fmRaw = fmMatch ? fmMatch[1] : ''
const jarjestysMatch = fmRaw.match(/projektiJarjestys:\n((?:  - .+\n?)*)/)
const nykyinenJarjestys = jarjestysMatch
  ? jarjestysMatch[1].trim().split('\n').map(r => r.replace(/^\s*- /, '').trim())
  : []

// Lue kaikki .mdoc-slugit tiedostojärjestelmästä
const kaikki = readdirSync(projektitDir)
  .filter(f => f.endsWith('.mdoc'))
  .map(f => f.replace(/\.mdoc$/, ''))

// Lisää puuttuvat listan loppuun
const uudet = kaikki.filter(slug => !nykyinenJarjestys.includes(slug))

if (uudet.length > 0) {
  const uusiJarjestys = [...nykyinenJarjestys, ...uudet]
  const uusiYml = 'projektiJarjestys:\n' + uusiJarjestys.map(s => `  - ${s}`).join('\n')
  const paivitetty = jarjestysMatch
    ? mdocContent.replace(/projektiJarjestys:\n(?:  - .+\n?)*/, uusiYml + '\n')
    : mdocContent.replace(/^---\n/, `---\n${uusiYml}\n`)
  writeFileSync(mdocPath, paivitetty)
  console.log('sync-projects: lisätty ' + uudet.join(', '))
} else {
  console.log('sync-projects: ei muutoksia')
}
