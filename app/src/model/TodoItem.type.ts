import type { DurationUnit } from "../common/DurationUnit.type";
import type { DbTodoItem } from "../data/DbTodoItem.type";

export type ExistingTodoItem = {
  key: number;
  name: string;
  description: string;
  typicalDuration: number;
  typicalDurationUnit: DurationUnit;
}

export type NewTodoItem = Omit<ExistingTodoItem, 'id'>;

export type TodoItem = ExistingTodoItem | NewTodoItem;

export function mapTodoItemFromDb(dbTodo: DbTodoItem): ExistingTodoItem {
  return {
    key: 0,
    ...dbTodo
  }
}
