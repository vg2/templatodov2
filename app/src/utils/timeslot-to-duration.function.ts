import { DurationUnit } from "../common/DurationUnit.type";

export function timeSlotToDuration(time: string, duration: number, durationUnit: DurationUnit): string {
    const validDurations: DurationUnit[] = ['Seconds', 'Minutes', 'Hours'];
    if (!validDurations.includes(durationUnit)) return `Start at ${time}`;

    const splitTime = time.split(':');
    const rawSeconds = splitTime[2];
    let seconds = parseInt(rawSeconds, 10);
    const rawMinutes = splitTime[1];
    let minutes = parseInt(rawMinutes, 10);
    const rawHours = splitTime[0];
    let hours = parseInt(rawHours, 10);

    if (durationUnit === 'Seconds') {
        const newSeconds = seconds + duration;
        seconds = newSeconds % 60;
        const newMinutes = minutes + Math.floor(newSeconds / 60);
        minutes = newMinutes % 60;
        hours = hours + Math.floor(newMinutes / 60);
    }

    if (durationUnit === 'Minutes') {
        const newMinutes = minutes + duration;
        minutes = newMinutes % 60;
        hours = hours + Math.floor(newMinutes / 60);
    }

    if (durationUnit == 'Hours') {
        hours = hours + duration;
    }

    return `${time} - ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    // if (durationUnit === 'Seconds') return `${time} - ${rawHours}:${rawMinutes}:${(seconds+duration).toString().padStart(2, '0')}`;
    // if (durationUnit === 'Minutes') return `${time} - ${rawHours}:${(minutes+duration).toString().padStart(2, '0')}:${rawSeconds}`;
    // if (durationUnit === 'Hours') return `${time} - ${(hours+duration).toString().padStart(2, '0')}:${rawMinutes}:${rawSeconds}`; 
}
