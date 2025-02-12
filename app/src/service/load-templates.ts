import { openDb } from "../data/db";
import { type ExistingTemplate, mapTemplateFromDb } from "../model/Template.type";
import { mapTimeSlotFromDb } from "../model/TimeSlot.type";
import { mapTodoItemFromDb } from "../model/TodoItem.type";

export async function loadTemplates(): Promise<ExistingTemplate[]> {
    const db = await openDb();
    const dbTemplates = await db.getAll('templates');
    const templates = dbTemplates.map(mapTemplateFromDb);
    const dbTimeSlots = await db.getAll('timeSlots');
    const timeSlots = dbTimeSlots.map(mapTimeSlotFromDb);
    const dbTodoItems = await db.getAll('todoItems');
    const todoItems = dbTodoItems.map(mapTodoItemFromDb);

    for (const t of templates) {
        const dbTemplate = dbTemplates.find(dbt => dbt.key === t.key);
        if (!dbTemplate) continue;

        for (const { pointsInCycle, timeSlotKey: timeSlotId, todoItemKey: todoItemId } of dbTemplate.todos) {
            const todoItem = todoItems.find(dbtodo => dbtodo.key === todoItemId);
            const timeSlot = timeSlots.find(dbts => dbts.key === timeSlotId);
            if (!todoItem || !timeSlot) continue;

            t.todos.push({ todoItem, timeSlot, pointsInCycle })
        }
    }


    return templates;
}

export async function loadTemplate(templateId: number): Promise<ExistingTemplate> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', templateId);
    if (!dbTemplate) throw new Error("could not find template");
    const template = mapTemplateFromDb(dbTemplate);
    const dbTimeSlots = await db.getAll('timeSlots');
    const timeSlots = dbTimeSlots.map(mapTimeSlotFromDb);
    const dbTodoItems = await db.getAll('todoItems');
    const todoItems = dbTodoItems.map(mapTodoItemFromDb);


    for (const { timeSlotKey: timeSlotId, todoItemKey: todoItemId, pointsInCycle } of dbTemplate.todos) {
        const todoItem = todoItems.find(dbtodo => dbtodo.key === todoItemId);
        const timeSlot = timeSlots.find(dbts => dbts.key === timeSlotId);
        if (!todoItem || !timeSlot) continue;

        template.todos.push({ todoItem, timeSlot, pointsInCycle })
    }

    return template;
}
