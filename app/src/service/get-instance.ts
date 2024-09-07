import type { DbTemplateInstance } from "../data/DbTemplateInstance.type";
import { openDb } from "../data/db";
import { type TemplateInstance, mapTemplateInstanceFromDb } from "../model/TemplateInstance.type";
import { loadTemplate } from "./load-templates";

export async function getInstance(templateId: number | null, date: string): Promise<TemplateInstance | null> {
    if (!templateId) return Promise.resolve(null);
    
    const db = await openDb();
    const dbTemplateInstances = await db.getAll('templateInstances');
    const template = await loadTemplate(templateId);
    const templateInstances = dbTemplateInstances.map(dbti => mapTemplateInstanceFromDb(dbti, template));
    // todo: use better logic to determine if existing instance is applicable
    // when it can span days
    const templateInstance = templateInstances.find(ti => ti.templateSnapshot.id === templateId && ti.date === date); 
    if (templateInstance) {
        return templateInstance;
    }

    const dbTemplate = await db.get('templates', templateId);
    if (!dbTemplate) throw new Error("could not find template");

    const newTemplateInstance: DbTemplateInstance = {
        date: date,
        templateSnapshot: dbTemplate,
        actionedItems: [],
    }; 
    const key = await db.put('templateInstances', newTemplateInstance);
    newTemplateInstance.id = key;
    return mapTemplateInstanceFromDb(newTemplateInstance, template);
}
