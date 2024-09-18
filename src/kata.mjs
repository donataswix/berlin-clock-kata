import * as rl from "node:readline/promises";

for await (const line of rl.createInterface({ input: process.stdin })) {
    console.log(`${line} => ${toBerlinClock(line)}`);
}

function generalLightPattern(i, count) {
    return count <= i ? "." : "X";
}

function fiveMinutesPattern(i, count) {
    return count <= i ? "." : (i + 1) % 3 === 0 ? "|" : "X";
}

function generateLights(count, patternFunc = generalLightPattern, totalLights = 4) {
    const generate = (index) => {
        if (index >= totalLights) return [];
        const currentLight = patternFunc(index, count);
        return [currentLight, ...generate(index + 1)];
    };
    return generate(0).reduce((acc, light) => acc + light, "");
}

function toBerlinClock(line) {
    const interval = 5;
    const fiveMinutesLights = 11;

    const [hours, minutes, seconds] = line.split(":").map(Number);

    const fiveHoursCount = Math.floor(hours / interval);
    const singleHourCount = hours % interval;
    const fiveMinutesCount = Math.floor(minutes / interval);
    const singleMinuteCount = minutes % interval;

    const fiveHoursString = generateLights(fiveHoursCount);
    const singleHoursString = generateLights(singleHourCount);
    const fiveMinutesString = generateLights(fiveMinutesCount, fiveMinutesPattern, fiveMinutesLights);
    const singleMinutesString = generateLights(singleMinuteCount);
    const secondsLight = seconds % 2 === 0 ? "." : "X";

    return `${secondsLight} ${fiveHoursString} ${singleHoursString} ${fiveMinutesString} ${singleMinutesString}`;
}
