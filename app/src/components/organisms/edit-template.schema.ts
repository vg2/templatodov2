import type { TemplateFormType } from "@app/model/Template.type";
import { z, type ZodType } from "zod";

export const editTemplateSchema = z.object({
    key: z.number(),
    name: z.string().min(2, 'Template name must be at least 2 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters').max(100, 'Description must be at most 100 characters'),
    cycleLength: z.number(),
    frequency: z.enum(['Daily', 'Weekly', 'Monthly']),
    startDate: z.coerce.date()
}) satisfies ZodType<TemplateFormType>;
