import type { DbTemplate } from "@app/data/DbTemplate.type";
import { openDb } from "../data/db";

export async function insertTemplate(template: DbTemplate): Promise<void> {
    const db = await openDb();
    await db.put('templates', template);
}
