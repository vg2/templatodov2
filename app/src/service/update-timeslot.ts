// import { DbTimeSlot } from "@app/data/DbTimeSlot.type";
// import { openDb } from "../data/db";
// import { TimeSlotFormType } from "@app/model/TimeSlot.type";
//
// export async function saveTimeSlot(timeSlot: TimeSlotFormType): Promise<number> {
//     const db = await openDb();
//     let timeSlotToSave: DbTimeSlot = { ...timeSlot, todoItemIds: <number[]>[] };
//     if (timeSlot.id) {
//         const dbTimeSlot = await db.get('timeSlots', timeSlot.id);
//         timeSlotToSave = { ...dbTimeSlot!, ...timeSlot };
//     }
//     return await db.put('timeSlots', timeSlotToSave);
// }
