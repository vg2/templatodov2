import { TemplateFormType } from "@app/model/Template.type";
import { openDb } from "../data/db";
import { DbTemplate } from "@app/data/DbTemplate.type";

export async function updateTemplate(template: TemplateFormType): Promise<void> {
    const db = await openDb();
    const dbTemplate = await db.get('templates', template.id!);
    const updatedTemplate: DbTemplate = { ...dbTemplate!, ...template };
    await db.put('templates', updatedTemplate);
}
