import type { IDBPDatabase } from "idb";
import type { TemplaTodoDb } from "./db";
import { parse } from "date-fns";
import { DateFormat } from "@app/common/DateFormat";

export default async function seedData(db: IDBPDatabase<TemplaTodoDb>): Promise<void> {
  const count = await db.count('templates');
  if (count === 0) {
    db.put('templates', {
      key: 1,
      name: "Viaan's activity schedule",
      description: "Template of todo items for Viaan's schedule",
      frequency: "Daily",
      cycleLength: 14,
      startDate: parse("2024-03-15", DateFormat, new Date()),
      todos: [{ timeSlotKey: 1, todoItemKey: 1, pointsInCycle: [1] }],
    });

    db.put('timeSlots', {
      key: 1,
      name: "P1",
      description: "Playtime 1",
      duration: 60,
      durationUnit: "Minutes",
      timeOfDay: "07:30:00",
      templateKey: 1,
    })

    db.put('todoItems', {
      key: 1,
      name: "Tactile creativity",
      description: "Explore textures - texture books, around the house, etc",
      typicalDuration: 60,
      typicalDurationUnit: 'Minutes',
    });
  }
}
