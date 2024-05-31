import { IDBPDatabase } from "idb";
import { TemplaTodoDb } from "./db";

export default async function seedData(db: IDBPDatabase<TemplaTodoDb>): Promise<void> {
  const count = await db.count('templates');
  if (count === 0) {
    db.put('templates', {
      id: 1,
      name: "Viaan's schedule",
      description: "Template of todo items for Viaan's schedule",
      frequency: "Daily",
      cycleLength: 14,
      startDate: "2024-03-15",
      timeSlots: [{
        name: "P1",
        description: "Playtime 1",
        duration: 60,
        durationUnit: "Minutes",
        timeOfDay: "07:30:00",
        todoItems: [{
          name: "Tactile creativity",
          description: "Explore textures - texture books, around the house, etc",
          typicalDuration: 60,
          typicalDurationUnit: 'Minutes',
        }]
      }]
    })
  }
}
