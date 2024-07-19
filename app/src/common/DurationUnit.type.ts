export const AllDurations = ['Seconds' , 'Minutes' , 'Hours' , 'Days' , 'Weeks' , 'Months' , 'Years'] as const;
export type DurationUnit = (typeof AllDurations)[number];
