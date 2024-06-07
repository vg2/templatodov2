import { DurationUnit } from "../common/DurationUnit.type";
import { DbTodoItem } from "../data/DbTodoItem.type";

export type TodoItem = {
  id: number;
  name: string;
  description: string;
  typicalDuration: number;
  typicalDurationUnit: DurationUnit;
}

export function mapTodoItemFromDb(dbTodo: DbTodoItem): TodoItem {
  return {
    ...dbTodo
  }
}
