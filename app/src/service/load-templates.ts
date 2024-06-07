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
    timeSlots.forEach(ts => {
        const dbTimeSlot = dbTimeSlots.find(dbts => ts.id === dbts.id);
        const timeSlotTodo = todoItems.filter(todo => dbTimeSlot?.todoItemIds.includes(todo.id));
        ts.todoItems = timeSlotTodo;
    });

    templates.forEach(t => {
        const dbTemplate = dbTemplates.find(dbt => dbt.id === t.id);
        const templateTimeSlots = timeSlots.filter(ts => dbTemplate?.timeSlotIds.includes(ts.id));
        t.timeSlots = templateTimeSlots;
    });

    return templates;
}

export async function loadTemplate(templateId: number): Promise<Template> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', templateId);
    const dbTimeSlots = await db.getAll('timeSlots');
    const dbTodoItems = await db.getAll('todoItems');
    const timeSlots = dbTimeSlots.filter(dbts => dbTemplate?.timeSlotIds.includes(dbts.id)).map(mapTimeSlotFromDb);
    timeSlots.forEach(ts => {
        const dbTimeSlot = dbTimeSlots.find(dbts => dbts.id === ts.id);
        const timeSlotTodos = dbTodoItems.filter(dbtodo => dbTimeSlot?.todoItemIds.includes(dbtodo.id))
            .map(mapTodoItemFromDb);
        ts.todoItems = timeSlotTodos;
        
    })
    const template = mapTemplateFromDb(dbTemplate!);
    template.timeSlots = timeSlots;
    return template;
}
