import type { DbTimeSlot } from "@app/data/DbTimeSlot.type";
import { openDb } from "../data/db";
import type { TimeSlot } from "@app/model/TimeSlot.type";

export async function saveTimeSlot(timeSlot: TimeSlot): Promise<number> {
    const db = await openDb();
    let timeSlotToSave: DbTimeSlot = { ...timeSlot };
    if (timeSlot.id) {
        const dbTimeSlot = await db.get('timeSlots', timeSlot.id);
        if(!dbTimeSlot) throw new Error("could not find timeslot");
        timeSlotToSave = { ...dbTimeSlot, ...timeSlot };
    }
    return await db.put('timeSlots', timeSlotToSave);
}
