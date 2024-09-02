import type { DbTemplate } from "./DbTemplate.type";
import type { TodoState } from "../common/TodoState";

export type DbTemplateInstance = {
  id?: number;
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
