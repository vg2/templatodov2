import type { ExistingTemplateForm } from "@app/model/Template.type";
import { openDb } from "../data/db";
import type { DbTemplate } from "@app/data/DbTemplate.type";

export async function updateTemplate(template: ExistingTemplateForm): Promise<void> {
    const db = await openDb();
    if (!('id' in template)) throw new Error('cannot update without id');
    const dbTemplate = await db.get('templates', template.key ?? 0);
    if (!dbTemplate) throw new Error("Could not find template");
    // biome-ignore lint/performance/noDelete: <explanation>
    delete template.todos;
    const templateChanges: Omit<ExistingTemplateForm, 'todos'> = template;
    const updatedTemplate: DbTemplate = { ...dbTemplate, ...templateChanges };
    await db.put('templates', updatedTemplate);
}
