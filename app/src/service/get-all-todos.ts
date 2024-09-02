
import { mapTodoItemFromDb, type TodoItem } from "@app/model/TodoItem.type";
import { openDb } from "../data/db";

export async function getAllTodos(): Promise<TodoItem[]> {
    const db = await openDb();
    const dbTodos = await db.getAll('todoItems');
    return dbTodos.map(mapTodoItemFromDb);
}
