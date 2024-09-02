
import { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { openDb } from "../data/db";
import { DbTodoItemInTemplate } from "@app/data/DbTodoItemInTemplate.type";

export async function saveTodosInTemplate(templateId: number, todosInTemplate: TodoItemInTemplate[]): Promise<number> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', templateId);
    const dbTodosInTemplate : DbTodoItemInTemplate[] = todosInTemplate.map(t => ({ pointsInCycle: t.pointsInCycle, timeSlotId: t.timeSlot.id!, todoItemId: t.todoItem.id! })); 
    dbTemplate!.todos = dbTodosInTemplate;
    return await db.put('templates', dbTemplate!);
}
