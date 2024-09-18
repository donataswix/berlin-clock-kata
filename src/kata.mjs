import * as rl from 'node:readline/promises'

for await (const line of rl.createInterface({ input: process.stdin })) {
  console.log(`${line} => ${toBerlinClock(line)}`)
}

function toBerlinClock(line) {
  // split
  const clockRows = line.split(':');
  const hours = clockRows[0];
  const minutes = clockRows[1];
  const seconds = clockRows[2];

  // repeating conditional logic in below funcs
  const getSingleCountLights = (count, lights = '') => {
    if (lights.length === 4) return lights;
    if (lights.length < count) {
      return getSingleCountLights(count, lights + 'X');
    } else {
      return getSingleCountLights(count, lights + '.');
    }
  }

  const getMinuteLights = (count, lights = '') => {
    if (lights.length === 11) return lights;
    if (lights.length < count) {
      return getMinuteLights(count, lights + ((lights.length + 1) % 3 === 0 ? '|' : 'X'));
    } else {
      return getMinuteLights(count, lights + '.');
    }
  };

  const secondsLight = seconds % 2 === 0 ? '.' : 'X';

  const fiveHourLights = getSingleCountLights(Math.floor(hours / 5));
  const oneHourLights = getSingleCountLights(hours % 5);

  const fiveMinuteLights = getMinuteLights(Math.floor(minutes / 5));
  const oneMinuteLights = getSingleCountLights(minutes % 5);

  return `${secondsLight} ${fiveHourLights} ${oneHourLights} ${fiveMinuteLights} ${oneMinuteLights}`

}
