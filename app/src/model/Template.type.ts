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

export function mapTemplateFromDb(dbTemplate: DbTemplate): ExistingTemplate {
  return {
    id: 0,
    ...dbTemplate,
    todos: []
  }
}

export type NewTemplateForm = NewTemplate;
export type ExistingTemplateForm = Omit<ExistingTemplate, 'todos'> & Partial<Pick<ExistingTemplate, 'todos'>>;
export type TemplateFormType = NewTemplateForm | ExistingTemplateForm;
