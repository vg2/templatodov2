import { addMonths, addWeeks, isAfter, isBefore, isEqual, parseISO } from "date-fns";
import type { DbTemplateInstance } from "../data/DbTemplateInstance.type";
import { openDb } from "../data/db";
import {
    type TemplateInstance,
    mapTemplateInstanceFromDb,
} from "../model/TemplateInstance.type";
import { loadTemplate } from "./load-templates";
import type { Frequency } from "@app/common/Frequency.type";

const utcMidnight = "T00:00:00Z";
const dateValidInTemplate = (
    checkDate: Date,
    instanceDate: Date,
    templateStartDate: Date,
    cycleCount: number,
    cycleFrequency: Frequency,
): boolean => {
    if (cycleFrequency === 'Daily') {
        return isEqual(checkDate, instanceDate);
    }

    let templateDate = templateStartDate;
    let min = templateDate;

    while (templateDate < instanceDate) {
        min = templateDate;
        switch (cycleFrequency) {
            case "Weekly":
                templateDate = addWeeks(templateDate, cycleCount);
                break;
            case "Monthly":
                templateDate = addMonths(templateDate, cycleCount);
                break;
        }
    }

    return isBefore(checkDate, templateDate) && isAfter(checkDate, min);
};

export async function getInstance(
    templateId: number | null,
    date: string,
): Promise<TemplateInstance | null> {
    if (!templateId) return Promise.resolve(null);

    const db = await openDb();
    const allDbTemplateInstances = await db.getAll("templateInstances");
    const dbTemplateInstances = allDbTemplateInstances.filter(
        (adbi) => adbi.templateSnapshot.key === templateId,
    );
    const template = await loadTemplate(templateId);
    const templateInstances = dbTemplateInstances.map((dbti) =>
        mapTemplateInstanceFromDb(dbti, template),
    );
    const dateOrderableTemplateInstances = templateInstances.map((ti) => ({
        instance: ti,
        date: parseISO(`${ti.date}${utcMidnight}`),
    }));
    const orderedTemplateInstances = dateOrderableTemplateInstances.sort(
        (a, b) => (isAfter(b.date, a.date) ? 1 : -1),
    );

    const templateInstance = orderedTemplateInstances[0];
    if (templateInstance && dateValidInTemplate(parseISO(`${date}${utcMidnight}`), templateInstance.date, template.startDate, template.cycleLength, template.frequency)) {
        return templateInstance.instance;
    }

    const dbTemplate = await db.get("templates", templateId);
    if (!dbTemplate) throw new Error("could not find template");

    const newTemplateInstance: DbTemplateInstance = {
        date: date,
        templateSnapshot: dbTemplate,
        actionedItems: [],
    };
    const key = await db.put("templateInstances", newTemplateInstance);
    newTemplateInstance.key = key;
    return mapTemplateInstanceFromDb(newTemplateInstance, template);
}
