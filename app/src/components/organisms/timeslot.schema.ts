import { AllDurations } from "@app/common/DurationUnit.type";
import { TimeSlotFormType } from "@app/model/TimeSlot.type";
import { z, ZodType } from "zod";

export const timeSlotSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, 'Time slot name must be at least 2 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters').max(100, 'Description must be at most 100 characters'),
    duration: z.number(),
    durationUnit: z.enum(AllDurations),
    timeOfDay: z.string()

}) satisfies ZodType<TimeSlotFormType>;
