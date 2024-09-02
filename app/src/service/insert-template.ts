import type { DbTemplate } from "@app/data/DbTemplate.type";
import { openDb } from "../data/db";
import type { TemplateFormType } from "@app/model/Template.type";

export async function insertTemplate(template: TemplateFormType): Promise<void> {
    const db = await openDb();
    const dbTemplate: DbTemplate = {
        ...template,
        todos: []
    }
    await db.put('templates', dbTemplate);
}
