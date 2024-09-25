import * as rl from "node:readline/promises";

for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`);
}

function toBerlinClock(line) {
  const [h, m, s] = split(":", line).map(Number);

  const seconds = s % 2 === 0 ? "." : "X";

  const hours1 = repeat("X", Math.floor(h / 5)).padEnd(4, ".");
  const hours2 = "X".repeat(h % 5).padEnd(4, ".");

  const minutes1 =
    substring("XX|".repeat(4), 0, Math.floor(m / 5)) +
    ".".repeat(11 - Math.floor(m / 5));
  const minutes2 = padEnd("X".repeat(m % 5), 4, ".");

  return [seconds, hours1, hours2, minutes1, minutes2].join(" ");
}

function padEnd(str, n, c) {
  return str + repeat(c, n - str.length);
}

function substring(str, k, l) {
  const answer = unfold(["", k], ([result, i]) => {
    if (i < l) {
      return [result + str[i], ++i];
    }
    return false;
  });

  return answer[0];
}

function repeat(str, n) {
  const finalState = unfold(["", 0], ([k, i]) => {
    if (i < n) {
      return [k + str, ++i];
    }
    return false;
  });
  return finalState[0];
}

function unfold(state, fn) {
  const next = fn(state);
  return next ? unfold(next, fn) : state;
}
function join(sep, array) {
  return reduce(
    (acc, x) => {
      return acc + sep + x;
    },
    tail(array),
    array[0]
  );
}
function split(c, string) {
  const state = {
    masyvas: [],
    start: 0,
    i: 0,
  };
  const answer = unfold(state, ({ masyvas, start, i }) => {
    if (i > string.length) return false;
    if (string[i] === c || i === string.length) {
      return {
        masyvas: [...masyvas, substring(string, start, i)],
        start: i + 1,
        i: i + 1,
      };
    } else return { masyvas: masyvas, start: start, i: i + 1 };
  });
  return answer.masyvas;
}

function map(fn, array) {
  return reduce((acc, x) => [...acc, fn(x)], array, []);
}

function reverse(array) {
  return reduce((acc, x) => [x, ...acc], array, []);
}

function reduce(fn, array, acc) {
  return array.length > 0 ? reduce(fn, tail(array), fn(acc, head(array))) : acc;
}

function tail([, ...tail]) {
  return tail;
}

function head([x]) {
  return x;
}
