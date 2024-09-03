import type { TemplateFormType } from "@app/model/Template.type";
import { openDb } from "../data/db";
import type { DbTemplate } from "@app/data/DbTemplate.type";

export async function updateTemplate(template: TemplateFormType): Promise<void> {
    const db = await openDb();
    if(!('id' in template)) throw new Error('cannot update without id');
    const dbTemplate = await db.get('templates', template.id ?? 0);
    if (!dbTemplate) throw new Error("Could not find template");
    const updatedTemplate: DbTemplate = { ...dbTemplate, ...template };
    await db.put('templates', updatedTemplate);
}
