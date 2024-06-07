import { Template } from "./Template.type";
import { TodoState } from "../common/TodoState";
import { DbTemplateInstance } from "../data/DbTemplateInstance.type";

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
    id: dbInstance.id!,
    date: dbInstance.date,
    templateSnapshot: mappedTemplate,
    actionedItems: dbInstance.actionedItems
  }
}
