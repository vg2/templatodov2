import { TodoItem } from "@app/model/TodoItem.type";
import { TodoItemInTemplate, TodoItemsInTemplateForm } from "@app/model/TodoItemInTemplate.type";
import { AllDurations } from "@app/common/DurationUnit.type";
import { z, ZodType } from "zod";
import { timeSlotSchema } from "./timeslot.schema";

const todo = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string(),
    typicalDuration: z.number(),
    typicalDurationUnit: z.enum(AllDurations)
}) satisfies ZodType<TodoItem>;


const todoInTemplate = z.object({
  todoItem: todo,
  timeSlot: timeSlotSchema,
  pointInCycle: z.number()
}) satisfies ZodType<TodoItemInTemplate>;

export const managingExistingTodos = z.object({
    todoItemsInTemplate: z.array(todoInTemplate)
}) satisfies ZodType<TodoItemsInTemplateForm>;
