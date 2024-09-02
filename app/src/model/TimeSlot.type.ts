import { DurationUnit } from "../common/DurationUnit.type";
import { DbTimeSlot } from "../data/DbTimeSlot.type";

export type TimeSlot = {
  id?: number;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  templateId: number;
}

export type NewTimeSlotForm = Partial<TimeSlot>;

export function mapTimeSlotFromDb(dbTimeSlot: DbTimeSlot): TimeSlot {
  return {
    ...dbTimeSlot,
  }
}
