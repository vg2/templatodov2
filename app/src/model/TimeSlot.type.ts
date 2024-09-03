import type { DurationUnit } from "../common/DurationUnit.type";
import type { DbTimeSlot } from "../data/DbTimeSlot.type";

export type ExistingTimeSlot = {
  id: number;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  templateId: number;
}

export type NewTimeSlot = Omit<ExistingTimeSlot, 'id'>;

export type TimeSlot = ExistingTimeSlot | NewTimeSlot;

export type NewTimeSlotForm = Partial<NewTimeSlot>;

export function mapTimeSlotFromDb(dbTimeSlot: DbTimeSlot): ExistingTimeSlot {
  return {
    id: 0,
    ...dbTimeSlot,
  }
}
