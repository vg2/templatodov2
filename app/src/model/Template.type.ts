import { DbTemplate } from "../data/DbTemplate.type";
import { TimeSlot } from "./TimeSlot.type";

export type Template = {
  cycleLength: number;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  id?: number;
  name: string;
  startDate: Date;
  timeSlots: TimeSlot[];
}

export function mapTemplateFromDb(dbTemplate: DbTemplate): Template {
  return {
    ...dbTemplate,
    timeSlots: []
  }
}

export type TemplateFormType = Omit<Template, 'timeSlots'>;
