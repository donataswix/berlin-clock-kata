import * as rl from "node:readline/promises";

const getSecondsLamp = (seconds) => (seconds % 2 === 0 ? "." : "X");
const getFiveHoursLamps = (hours, interval, length, result = "") => {
  if (hours < interval) {
    if (result.length === length) return result;
    return getFiveHoursLamps(hours, interval, length, result + ".");
  }
  return getFiveHoursLamps(hours - interval, interval, length, result + "X");
};
const getOneHourLamps = (hours, interval, length, result = "") => {
  if (hours < interval) {
    if (result.length === length) return result;
    return getOneHourLamps(hours, interval, length, result + ".");
  }
  return getOneHourLamps(hours - interval, interval, length, result + "X");
};
const getFiveMinuteLamps = (minutes, interval, length, result = "") => {
  if (minutes < interval) {
    if (result.length === length) return result;
    return getFiveMinuteLamps(minutes, interval, length, result + ".");
  }
  if (result.length % 3 === 2) {
    return getFiveMinuteLamps(
      minutes - interval,
      interval,
      length,
      result + "|"
    );
  }
  return getFiveMinuteLamps(minutes - interval, interval, length, result + "X");
};
const getOneMinuteLamps = (minutes, interval, length, result = "") => {
  if (minutes < interval) {
    if (result.length === length) return result;
    return getOneMinuteLamps(minutes, interval, length, result + ".");
  }
  return getOneMinuteLamps(minutes - interval, interval, length, result + "X");
};
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
    getFiveHoursLamps(hours, 5, 4) +
    " " +
    getOneHourLamps(hours % 5, 1, 4) +
    " " +
    getFiveMinuteLamps(minutes, 5, 11) +
    " " +
    getOneMinuteLamps(minutes % 5, 1, 4)
  );
}
for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`);
}
