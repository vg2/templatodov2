// import { openDb } from "../data/db";
//
// export async function addTimeSlotToTemplate(templateId: number, timeSlotId: number): Promise<void> {
//     const db = await openDb();
//     const template = await db.get('templates', templateId);
//     template!.timeSlotIds.push(timeSlotId!);
//     await db.put('templates', template!);
// }
