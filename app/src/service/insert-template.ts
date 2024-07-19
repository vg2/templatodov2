import { DbTemplate } from "@app/data/DbTemplate.type";
import { openDb } from "../data/db";
import { TemplateFormType } from "@app/model/Template.type";

export async function insertTemplate(template: TemplateFormType): Promise<void> {
    const db = await openDb();
    const dbTemplate: DbTemplate = {
        ...template,
        timeSlotIds: []
    }
    await db.put('templates', dbTemplate);
}
