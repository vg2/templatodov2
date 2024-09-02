import type { DbTodoItemInTemplate } from "./DbTodoItemInTemplate.type";

export type DbTemplate = {
  cycleLength: number;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  id?: number;
  name: string;
  startDate: Date;
  todos: DbTodoItemInTemplate[];
}
