import type { DurationUnit } from "../common/DurationUnit.type";
import type { DbTimeSlot } from "../data/DbTimeSlot.type";

export type ExistingTimeSlot = {
  key: number;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  templateKey: number;
}

export type NewTimeSlot = Omit<ExistingTimeSlot, 'key'>;

export type TimeSlot = ExistingTimeSlot | NewTimeSlot;

export type NewTimeSlotForm = Partial<NewTimeSlot>;

export function mapTimeSlotFromDb(dbTimeSlot: DbTimeSlot): ExistingTimeSlot {
  return {
    key: 0,
    ...dbTimeSlot,
  }
}
