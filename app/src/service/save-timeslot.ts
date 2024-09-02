import { DbTimeSlot } from "@app/data/DbTimeSlot.type";
import { openDb } from "../data/db";
import { TimeSlot } from "@app/model/TimeSlot.type";

export async function saveTimeSlot(timeSlot: TimeSlot): Promise<number> {
    const db = await openDb();
    let timeSlotToSave: DbTimeSlot = { ...timeSlot };
    if (timeSlot.id) {
        const dbTimeSlot = await db.get('timeSlots', timeSlot.id);
        timeSlotToSave = { ...dbTimeSlot!, ...timeSlot };
    }
    return await db.put('timeSlots', timeSlotToSave);
}
