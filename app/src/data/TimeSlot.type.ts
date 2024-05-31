import { DurationUnit } from "./DurationUnit.type";
import { TodoItem } from "./TodoItem.type";

export type TimeSlot = {
  id?: string;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  todoItems: TodoItem[];
}
