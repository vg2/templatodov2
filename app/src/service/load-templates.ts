import { openDb } from "../data/db";
import { Template, mapTemplateFromDb } from "../model/Template.type";
import { mapTimeSlotFromDb } from "../model/TimeSlot.type";
import { mapTodoItemFromDb } from "../model/TodoItem.type";

export async function loadTemplates(): Promise<Template[]> {
    const db = await openDb();
    const dbTemplates = await db.getAll('templates');
    const templates = dbTemplates.map(mapTemplateFromDb);
    const dbTimeSlots = await db.getAll('timeSlots');
    const timeSlots = dbTimeSlots.map(mapTimeSlotFromDb);
    const dbTodoItems = await db.getAll('todoItems');
    const todoItems = dbTodoItems.map(mapTodoItemFromDb);

    templates.forEach(t => {
        const dbTemplate = dbTemplates.find(dbt => dbt.id === t.id)!;
        dbTemplate.todos.forEach(({ timeSlotId, todoItemId, pointInCycle }) => {
            const todoItem = todoItems.find(dbtodo => dbtodo.id === todoItemId)!;
            const timeSlot = timeSlots.find(dbts => dbts.id === timeSlotId)!;
            t.todos.push({ todoItem, timeSlot, pointInCycle })
        });
    });

    return templates;
}

export async function loadTemplate(templateId: number): Promise<Template> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', templateId);
    const template = mapTemplateFromDb(dbTemplate!);
    const dbTimeSlots = await db.getAll('timeSlots');
    const timeSlots = dbTimeSlots.map(mapTimeSlotFromDb);
    const dbTodoItems = await db.getAll('todoItems');
    const todoItems = dbTodoItems.map(mapTodoItemFromDb);

    dbTemplate!.todos.forEach(({ timeSlotId, todoItemId, pointInCycle }) => {
        const todoItem = todoItems.find(dbtodo => dbtodo.id === todoItemId)!;
        const timeSlot = timeSlots.find(dbts => dbts.id === timeSlotId)!;
        template.todos.push({ todoItem, timeSlot, pointInCycle })
    });

    return template;
}
