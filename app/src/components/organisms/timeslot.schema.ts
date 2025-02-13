import { AllDurations } from "@app/common/DurationUnit.type";
import type { ExistingTimeSlot, NewTimeSlot } from "@app/model/TimeSlot.type";
import { z, type ZodType } from "zod";

export const newTimeSlotSchema = z.object({
    name: z.string().min(2, "Time slot name must be at least 2 characters"),
    description: z
        .string()
        .min(2, "Description must be at least 2 characters")
        .max(100, "Description must be at most 100 characters"),
    duration: z.number(),
    durationUnit: z.enum(AllDurations),
    timeOfDay: z.string(),
    templateKey: z.number(),
}) satisfies ZodType<NewTimeSlot>;

export const existingTimeSlotSchema = newTimeSlotSchema.and(
    z.object({ key: z.number() }),
) satisfies ZodType<ExistingTimeSlot>;
