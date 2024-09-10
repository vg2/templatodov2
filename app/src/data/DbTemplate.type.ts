import type { Frequency } from "@app/common/Frequency.type";
import type { DbTodoItemInTemplate } from "./DbTodoItemInTemplate.type";

export type DbTemplate = {
  cycleLength: number;
  description: string;
  frequency: Frequency;
  id?: number;
  name: string;
  startDate: Date;
  todos: DbTodoItemInTemplate[];
}
