import type * as DbTemplateInstanceType from "../data/DbTemplateInstance.type";
import { openDb } from "../data/db";
import type { TemplateInstance } from "../model/TemplateInstance.type";

export async function updateInstance(instance: TemplateInstance): Promise<void> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', instance.templateSnapshot.key ?? 0);
    if (!dbTemplate) throw new Error("Could not find template");
    const dbInstance: DbTemplateInstanceType.DbTemplateInstance = {
        key: instance.key,
        actionedItems: instance.actionedItems,
        templateSnapshot: dbTemplate,
        date: instance.date,
    }
    await db.put('templateInstances', dbInstance);
}
