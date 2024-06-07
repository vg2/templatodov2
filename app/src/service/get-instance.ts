import { DbTemplateInstance } from "../data/DbTemplateInstance.type";
import { openDb } from "../data/db";
import { TemplateInstance, mapTemplateInstanceFromDb } from "../model/TemplateInstance.type";
import { loadTemplate } from "./load-templates";

export async function getInstance(templateId: number, date: string): Promise<TemplateInstance> {
    const db = await openDb();
    const dbTemplateInstances = await db.getAll('templateInstances');
    const template = await loadTemplate(templateId);
    const templateInstances = dbTemplateInstances.map(dbti => mapTemplateInstanceFromDb(dbti, template));
    const templateInstance = templateInstances.find(ti => ti.templateSnapshot.id === templateId && ti.date === date); 
    if (templateInstance) {
        return templateInstance;
    }

    const dbTemplate = await db.get('templates', templateId);
    const newTemplateInstance: DbTemplateInstance = {
        date: date,
        templateSnapshot: dbTemplate!,
        actionedItems: [],
    }; 
    const key = await db.put('templateInstances', newTemplateInstance);
    newTemplateInstance.id = key;
    return mapTemplateInstanceFromDb(newTemplateInstance, template);
}
