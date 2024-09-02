import type { TodoItem } from "@app/model/TodoItem.type";
import { openDb } from "../data/db";
import type { DbTodoItem } from "@app/data/DbTodoItem.type";

export async function insertTodo(todo: TodoItem): Promise<void> {
  const db = await openDb();
  const dbTodo: DbTodoItem = {
    ...todo,
  };
  await db.put("todoItems", dbTodo);
}
