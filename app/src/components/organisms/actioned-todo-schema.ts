import { AllTodoStates } from "@/common/TodoState";
import type { ActionedItemForm } from "@/model/TemplateInstance.type";
import { z, type ZodType } from "zod";

export const actionedTodoSchema = z.object({
    todoItemId: z.number(),
    comment: z.string(),
    state: z.enum(AllTodoStates),
    timestamp: z.string().optional(),
}) satisfies ZodType<ActionedItemForm>;
