import { DbTemplateInstance } from "../data/DbTemplateInstance.type";
import { openDb } from "../data/db";
import { TemplateInstance } from "../model/TemplateInstance.type";

export async function updateInstance(instance: TemplateInstance): Promise<void> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', instance.templateSnapshot.id!);
    const dbInstance: DbTemplateInstance = {
        id: instance.id,
        actionedItems: instance.actionedItems,
        templateSnapshot: dbTemplate!,
        date: instance.date,
    }
    await db.put('templateInstances', dbInstance);
}
