import { DurationUnit } from "../common/DurationUnit.type";

export type DbTimeSlot = {
  id?: number;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
}
