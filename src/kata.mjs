import * as rl from 'node:readline/promises'

for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`)
}
function toBerlinClock(line) {
  const [hours, minutes, seconds] = line.split(':').map(Number);
  const isNotEven = seconds % 2 !== 0;

  const amountOfHours5x = Math.floor(hours / 5);
  const amountOfHours1x = hours % 5;
  const amountOfMinutes5x = Math.floor(minutes / 5);
  const amountOfMinutes1x = minutes % 5;

  return buildBerlinClock(amountOfHours5x, amountOfHours1x, amountOfMinutes5x, amountOfMinutes1x, isNotEven);
}

function buildBerlinClock(hours5x, hours1x, minutes5x, minutes1x, isNotEven) {
  const secondsLight = isNotEven ? "X" : ".";

  const topHours = buildRowWithoutDash(hours5x, "X", 4);
  const bottomHours = buildRowWithoutDash(hours1x, "X", 4);
  const topMinutes = buildMinutesRowWithDash(minutes5x);

  const bottomMinutes = buildRowWithoutDash(minutes1x, "X", 4);

  return `${secondsLight} ${topHours} ${bottomHours} ${topMinutes} ${bottomMinutes}`;
}

function buildRowWithoutDash(minutes, char, maxLength) {
  if (maxLength === 0) return ''; 
  return (minutes > 0 ? char : ".") + buildRowWithoutDash(minutes - 1, char, maxLength - 1);
}

function buildMinutesRowWithDash(timeValue, position = 11) {
  if (position === 0) return '';
  return buildMinutesRowWithDash(timeValue, position - 1) +
    (position <= timeValue ? (position % 3 === 0 ? "|" : "X") : ".");
}