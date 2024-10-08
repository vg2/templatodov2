import { AllTodoStates } from "@/common/TodoState";
import type { ActionedItem } from "@/model/TemplateInstance.type";
import { z, type ZodType } from "zod";

export const actionedTodoSchema = z.object({
    todoItemId: z.number(),
    comment: z.string(),
    state: z.enum(AllTodoStates),
    timestamp: z.string(),
}) satisfies ZodType<ActionedItem>;
