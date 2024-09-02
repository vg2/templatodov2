import type { DbTemplate } from "../data/DbTemplate.type";
import type { TodoItemInTemplate } from "./TodoItemInTemplate.type";

export type Template = {
  cycleLength: number;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  id?: number;
  name: string;
  startDate: Date;
  todos: TodoItemInTemplate[];
}

export function mapTemplateFromDb(dbTemplate: DbTemplate): Template {
  return {
    ...dbTemplate,
    todos: []
  }
}

export type TemplateFormType = Omit<Template, 'todos'>;
