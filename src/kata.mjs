import * as rl from 'node:readline/promises'

for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`)
}

function toBerlinClock(line) {
  const [h, m, s] = line.split(':').map(Number)

  const seconds = s % 2 === 0 ? '.' : 'X'

  const hours1 = 'X'.repeat(Math.floor(h / 5)).padEnd(4, '.')
  const hours2 = 'X'.repeat(h % 5).padEnd(4, '.')

  const minutes1 = 'XX|'.repeat(4).substring(0, Math.floor(m / 5)) + '.'.repeat(11 - Math.floor(m / 5))
  const minutes2 = 'X'.repeat(m % 5).padEnd(4, '.')

  return [seconds, hours1, hours2, minutes1, minutes2].join(' ')
}

function padEnd(str, n, c) {
}

function substring(str, k, l) {
}

function repeat(str, n) {
}

function unfold(state, fn) {
  const next = fn(state)
  return next ? unfold(next, fn) : state
}

function join(sep, array) {
}

function split(c, string) {
}

function map(fn, array) {
  return reduce((acc, x) => [...acc, fn(x)], array, [])
}

function reverse(array) {
  return reduce((acc, x) => [x, ...acc], array, [])
}

function reduce(fn, array, acc) {
  return array.length > 0 ? reduce(fn, tail(array), fn(acc, head(array))) : acc
}

function tail([, ...tail]) {
  return tail
}

function head([x]) {
  return x
}
