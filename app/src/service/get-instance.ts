import { isAfter, parseISO } from "date-fns";
import type { DbTemplateInstance } from "../data/DbTemplateInstance.type";
import { openDb } from "../data/db";
import { type TemplateInstance, mapTemplateInstanceFromDb } from "../model/TemplateInstance.type";
import { loadTemplate } from "./load-templates";

const utcMidnight = 'T00:00:00Z';

export async function getInstance(templateId: number | null, date: string): Promise<TemplateInstance | null> {
    if (!templateId) return Promise.resolve(null);
    
    const db = await openDb();
    const allDbTemplateInstances = await db.getAll('templateInstances');
    const dbTemplateInstances = allDbTemplateInstances.filter(adbi => adbi.templateSnapshot.id === templateId);
    const template = await loadTemplate(templateId);
    const templateInstances = dbTemplateInstances.map(dbti => mapTemplateInstanceFromDb(dbti, template));
    const dateOrderableTemplateInstances = templateInstances.map(ti => ({ instance: ti, date: parseISO(`${ti.date}${utcMidnight}`)}));
    const orderedTemplateInstances = dateOrderableTemplateInstances.sort((a,b) => isAfter(b.date, a.date) ? 1 : -1);

    // todo: check if date param is valid for latest (first in ordered list) template instance
    const templateInstance = orderedTemplateInstances.find(ti => ti.instance.date === date); 
    if (templateInstance) {
        return templateInstance.instance;
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
