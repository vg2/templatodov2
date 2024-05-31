import { Template } from "./Template.type";
import { TodoState } from "./TodoState";

export type TemplateInstance = {
  id: string;
  templateSnapshot: Template;
  date: string;
  actionedItems: ActionedItem[];
}

export type ActionedItem = {
  todoItemId: string;
  state: TodoState;
  comment: string;
  timestamp: string;
}
