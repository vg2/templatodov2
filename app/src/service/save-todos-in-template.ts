import type { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { openDb } from "../data/db";
import type { DbTodoItemInTemplate } from "@app/data/DbTodoItemInTemplate.type";

export async function saveTodosInTemplate(templateId: number, todosInTemplate: TodoItemInTemplate[]): Promise<number> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', templateId);
    if (!dbTemplate) throw new Error("Could not get template");
    const dbTodosInTemplate: DbTodoItemInTemplate[] = todosInTemplate.map(t => ({ pointsInCycle: t.pointsInCycle, timeSlotKey: t.timeSlot.key ?? 0, todoItemKey: t.todoItem.key ?? 0 }));
    dbTemplate.todos = dbTodosInTemplate;
    return await db.put('templates', dbTemplate);
}
