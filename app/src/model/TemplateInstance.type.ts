import type { ExistingTemplate } from "./Template.type";
import type { TodoState } from "../common/TodoState";
import type { DbTemplateInstance } from "../data/DbTemplateInstance.type";

export type TemplateInstance = {
  id: number;
  templateSnapshot: ExistingTemplate;
  date: string;
  actionedItems: ActionedItem[];
}

export type ActionedItem = {
  todoItemId: number;
  state: TodoState;
  comment: string;
  timestamp: string;
}

export type ActionedItemForm = Omit<ActionedItem, 'timestamp'>;

export function mapTemplateInstanceFromDb(dbInstance: DbTemplateInstance, mappedTemplate: ExistingTemplate): TemplateInstance {
  return {
    id: dbInstance.id ?? 0,
    date: dbInstance.date,
    templateSnapshot: mappedTemplate,
    actionedItems: dbInstance.actionedItems
  }
}
