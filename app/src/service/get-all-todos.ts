
import { type ExistingTodoItem, mapTodoItemFromDb } from "@app/model/TodoItem.type";
import { openDb } from "../data/db";

export async function getAllTodos(): Promise<ExistingTodoItem[]> {
    const db = await openDb();
    const dbTodos = await db.getAll('todoItems');
    return dbTodos.map(mapTodoItemFromDb);
}
