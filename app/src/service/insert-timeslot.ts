import type { DbTimeSlot } from "@app/data/DbTimeSlot.type";
import { openDb } from "../data/db";

export async function insertTimeSlot(timeSlot: DbTimeSlot): Promise<number> {
    const db = await openDb();
    return await db.put('timeSlots', timeSlot);
}
