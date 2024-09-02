import type { Template } from "./Template.type";
import type { TodoState } from "../common/TodoState";
import type { DbTemplateInstance } from "../data/DbTemplateInstance.type";

export type TemplateInstance = {
  id: number;
  templateSnapshot: Template;
  date: string;
  actionedItems: ActionedItem[];
}

export type ActionedItem = {
  todoItemId: number;
  state: TodoState;
  comment: string;
  timestamp: string;
}

export function mapTemplateInstanceFromDb(dbInstance: DbTemplateInstance, mappedTemplate: Template): TemplateInstance {
  return {
    id: dbInstance.id ?? 0,
    date: dbInstance.date,
    templateSnapshot: mappedTemplate,
    actionedItems: dbInstance.actionedItems
  }
}
