import type { DbTemplate } from "../data/DbTemplate.type";
import type { TodoItemInTemplate } from "./TodoItemInTemplate.type";

export type ExistingTemplate = {
  cycleLength: number;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  id: number;
  name: string;
  startDate: Date;
  todos: TodoItemInTemplate[];
}

export type NewTemplate = Omit<Omit<ExistingTemplate, 'id'>, 'todos'>;

export type Template = NewTemplate | ExistingTemplate;

export function mapTemplateFromDb(dbTemplate: DbTemplate): Template {
  return {
    ...dbTemplate,
    todos: []
  }
}

export type TemplateFormType = Omit<Template, 'todos'>;
