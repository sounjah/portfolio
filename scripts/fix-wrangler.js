import { existsSync, readFileSync, writeFileSync } from 'fs'

const files = [
  'dist/server/wrangler.json',
  'dist/server/.prerender/wrangler.json',
]

const forbiddenKeys = ['rules', 'previews', 'observability', 'no_bundle']

for (const file of files) {
  if (!existsSync(file)) {
    console.log('Skipped (not found): ' + file)
    continue
  }
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
  } else {
    console.log('No changes needed: ' + file)
  }
}

// Korjaa .wrangler/deploy/config.json: poista prerenderWorkerConfigPath jos tiedostoa ei ole
const deployConfig = '.wrangler/deploy/config.json'
if (existsSync(deployConfig)) {
  const data = JSON.parse(readFileSync(deployConfig, 'utf8'))
  if (data.prerenderWorkerConfigPath && !existsSync(data.prerenderWorkerConfigPath)) {
    delete data.prerenderWorkerConfigPath
    writeFileSync(deployConfig, JSON.stringify(data))
    console.log('Fixed ' + deployConfig)
  }
}
