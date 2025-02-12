import type { ExistingTemplate } from "./Template.type";
import type { TodoState } from "../common/TodoState";
import type { DbTemplateInstance } from "../data/DbTemplateInstance.type";

export type TemplateInstance = {
  key: number;
  templateSnapshot: ExistingTemplate;
  date: string;
  actionedItems: ActionedItem[];
}

export type ActionedItem = {
  todoItemKey: number;
  state: TodoState;
  comment: string;
  timestamp: string;
}

export type ActionedItemForm = Omit<ActionedItem, 'timestamp'>;

export function mapTemplateInstanceFromDb(dbInstance: DbTemplateInstance, mappedTemplate: ExistingTemplate): TemplateInstance {
  return {
    key: dbInstance.key ?? 0,
    date: dbInstance.date,
    templateSnapshot: mappedTemplate,
    actionedItems: dbInstance.actionedItems
  }
}
