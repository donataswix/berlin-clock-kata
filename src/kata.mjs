import * as rl from 'node:readline/promises'

for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`)
}

function toBerlinClock(line) {
  return '. .... .... ........... ....'
}
