
import { openDb } from "../data/db";
import { mapTimeSlotFromDb, TimeSlot } from "@app/model/TimeSlot.type";

export async function getAllTimeslots(): Promise<TimeSlot[]> {
    const db = await openDb();
    const dbTodos = await db.getAll('timeSlots');
    return dbTodos.map(mapTimeSlotFromDb);
}
