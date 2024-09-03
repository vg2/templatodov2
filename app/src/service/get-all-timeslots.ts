
import { openDb } from "../data/db";
import { type ExistingTimeSlot, mapTimeSlotFromDb } from "@app/model/TimeSlot.type";

export async function getAllTimeslots(): Promise<ExistingTimeSlot[]> {
    const db = await openDb();
    const dbTodos = await db.getAll('timeSlots');
    return dbTodos.map(mapTimeSlotFromDb);
}
