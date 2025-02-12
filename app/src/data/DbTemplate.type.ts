import type { Frequency } from "@app/common/Frequency.type";
import type { DbTodoItemInTemplate } from "./DbTodoItemInTemplate.type";

export type DbTemplate = {
  cycleLength: number;
  description: string;
  frequency: Frequency;
  key?: number;
  name: string;
  startDate: Date;
  todos: DbTodoItemInTemplate[];
}
