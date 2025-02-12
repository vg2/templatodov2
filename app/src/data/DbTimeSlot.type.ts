import type { DurationUnit } from "../common/DurationUnit.type";

export type DbTimeSlot = {
  key?: number;
  name: string;
  description: string;
  duration: number;
  durationUnit: DurationUnit;
  timeOfDay: string;
  templateKey: number;
}
