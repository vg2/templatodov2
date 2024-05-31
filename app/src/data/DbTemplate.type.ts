export type DbTemplate = {
  cycleLength: number;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  id?: number;
  name: string;
  startDate: string | Date;
  timeSlotIds: number[];
}
