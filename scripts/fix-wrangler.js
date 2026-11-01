import { existsSync, readFileSync, writeFileSync } from 'fs'

const files = [
  'dist/server/wrangler.json',
  'dist/server/.prerender/wrangler.json',
]

const forbiddenKeys = ['assets', 'rules', 'main', 'previews', 'observability', 'no_bundle']

for (const file of files) {
  const data = JSON.parse(readFileSync(file, 'utf8'))
  let changed = false
  for (const key of forbiddenKeys) {
    if (key in data) {
      delete data[key]
      changed = true
    }
  }
  if (changed) {
    writeFileSync(file, JSON.stringify(data, null, 2))
    console.log('Fixed ' + file)
  }
}
