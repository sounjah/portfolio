import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const jarjestysPath = 'src/content/jarjestys.json'
const projektitDir = 'src/content/projektit'

const jarjestys = JSON.parse(readFileSync(jarjestysPath, 'utf8'))
const nykyinenJarjestys = jarjestys.projektiJarjestys ?? []

// Lue kaikki .mdoc-slugit tiedostojärjestelmästä
const kaikki = readdirSync(projektitDir)
  .filter(f => f.endsWith('.mdoc'))
  .map(f => f.replace(/\.mdoc$/, ''))

// Lisää puuttuvat listan loppuun
const uudet = kaikki.filter(slug => !nykyinenJarjestys.includes(slug))

if (uudet.length > 0) {
  jarjestys.projektiJarjestys = [...nykyinenJarjestys, ...uudet]
  writeFileSync(jarjestysPath, JSON.stringify(jarjestys, null, 2) + '\n')
  console.log('sync-projects: lisätty ' + uudet.join(', '))
} else {
  console.log('sync-projects: ei muutoksia')
}
