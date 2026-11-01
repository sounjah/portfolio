import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const etusivuPath = 'src/content/etusivu.json'
const projektitDir = 'src/content/projektit'

const etusivu = JSON.parse(readFileSync(etusivuPath, 'utf8'))
const nykyinenJarjestys = etusivu.projektiJarjestys ?? []

// Lue kaikki .mdoc-slugit tiedostojärjestelmästä
const kaikki = readdirSync(projektitDir)
  .filter(f => f.endsWith('.mdoc'))
  .map(f => f.replace(/\.mdoc$/, ''))

// Lisää puuttuvat listan loppuun
const uudet = kaikki.filter(slug => !nykyinenJarjestys.includes(slug))

if (uudet.length > 0) {
  etusivu.projektiJarjestys = [...nykyinenJarjestys, ...uudet]
  writeFileSync(etusivuPath, JSON.stringify(etusivu, null, 2) + '\n')
  console.log('sync-projects: lisätty ' + uudet.join(', '))
} else {
  console.log('sync-projects: ei muutoksia')
}
