import { TimeSlot } from "./TimeSlot.type";

export type Template = {
  cycleLength: number;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  id?: number;
  name: string;
  startDate: string | Date;
  timeSlots: TimeSlot[];
}
