import * as rl from "node:readline/promises";

const getSecondsLamp = (seconds) => (seconds % 2 === 0 ? "." : "X");

function getLamps(unit, interval, length, devider = undefined, result = "") {
  if (unit < interval) {
    if (result.length === length) return result;
    return getLamps(unit, interval, length, devider, result + ".");
  }
  if (devider && result.length % devider === devider - 1) {
    return getLamps(unit - interval, interval, length, devider, result + "|");
  }
  return getLamps(unit - interval, interval, length, devider, result + "X");
}

function toBerlinClock(line) {
  const [
    decimalHours,
    hour,
    ,
    decimalMinutes,
    minute,
    ,
    decimalSeconds,
    second,
  ] = line;
  const hours = decimalHours * 10 + parseInt(hour);
  const minutes = decimalMinutes * 10 + parseInt(minute);
  const seconds = decimalSeconds * 10 + parseInt(second);

  return (
    getSecondsLamp(seconds) +
    " " +
    getLamps(hours, 5, 4) +
    " " +
    getLamps(hours % 5, 1, 4) +
    " " +
    getLamps(minutes, 5, 11, 3) +
    " " +
    getLamps(minutes % 5, 1, 4)
  );
}

for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`);
}
