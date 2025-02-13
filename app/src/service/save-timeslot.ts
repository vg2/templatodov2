import type { DbTimeSlot } from "@app/data/DbTimeSlot.type";
import { openDb } from "../data/db";
import type { TimeSlot } from "@app/model/TimeSlot.type";

export async function saveTimeSlot(timeSlot: TimeSlot): Promise<number> {
    const db = await openDb();
    let timeSlotToSave: DbTimeSlot;
    if ('key' in timeSlot) {
        const dbTimeSlot = await db.get('timeSlots', timeSlot.key);
        if (!dbTimeSlot) throw new Error("could not find timeslot");
        timeSlotToSave = { ...dbTimeSlot, ...timeSlot };
    } else {
        timeSlotToSave = { ...timeSlot };
    }
    return await db.put('timeSlots', timeSlotToSave);
}
