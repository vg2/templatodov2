export const AllFrequencies = ['Daily', 'Weekly', 'Monthly'] as const;
export type Frequency = (typeof AllFrequencies)[number];
