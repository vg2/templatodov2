
import { TodoItem } from "@app/model/TodoItem.type";
import { openDb } from "../data/db";

export async function updateTemplate(templateId: number, todo: TodoItem): Promise<void> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', templateId);
    const todoIsInTemplate = dbTemplate!.todos.some(dbTodo => dbTodo.todoItemId === todo.id);
    if (todoIsInTemplate) {
        // dbTemplate.todos.push({
        //     todoItemId; todo.id,
        //     timeSlotId
        // })
    }
}
