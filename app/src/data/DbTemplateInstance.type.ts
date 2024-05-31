import { DbTemplate } from "./DbTemplate.type";
import { TodoState } from "../common/TodoState";

export type DbTemplateInstance = {
  id: number;
  templateSnapshot: DbTemplate;
  date: string;
  actionedItems: DbActionedItem[];
}

export type DbActionedItem = {
  todoItemId: number;
  state: TodoState;
  comment: string;
  timestamp: string;
}
