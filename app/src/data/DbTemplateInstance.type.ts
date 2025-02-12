import type { DbTemplate } from "./DbTemplate.type";
import type { TodoState } from "../common/TodoState";

export type DbTemplateInstance = {
  key?: number;
  templateSnapshot: DbTemplate;
  date: string;
  actionedItems: DbActionedItem[];
}

export type DbActionedItem = {
  todoItemKey: number;
  state: TodoState;
  comment: string;
  timestamp: string;
}
