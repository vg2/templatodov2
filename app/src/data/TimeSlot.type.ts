import { DurationUnit } from "./DurationUnit.type";
import { TodoItem } from "./TodoItem.type";

export type TimeSlot = {
  id: string;
  name: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  todoItems: TodoItem[];
}
