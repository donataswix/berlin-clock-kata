import * as rl from 'node:readline/promises'
import * as fs from 'node:fs'

const gold = Object.fromEntries(
  fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
    .split('\n')
    .map(line => line.split(' => '))
)

for await (const line of rl.createInterface({ input: process.stdin })) {
  const [digital, berlin] = line.split(' => ')
  process.stdout.write(line)
  let result = ' ?'
  if (digital in gold) {
    if (gold[digital] === berlin)
      result = ' ✓'
    else
      result = ' ×'
  }
  process.stdout.write(result)
  process.stdout.write('\n')
}
