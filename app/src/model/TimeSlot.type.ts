import { DurationUnit } from "../common/DurationUnit.type";
import { DbTimeSlot } from "../data/DbTimeSlot.type";
import { TodoItem } from "./TodoItem.type";

export type TimeSlot = {
  id: number;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  todoItems: TodoItem[];
}

export function mapTimeSlotFromDb(dbTimeSlot: DbTimeSlot): TimeSlot {
  return {
    ...dbTimeSlot,
    todoItems: [],
  }
}
