import { Template } from "./Template.type";
import { TodoState } from "../common/TodoState";

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
