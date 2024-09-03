import type { ExistingTodoItem, NewTodoItem } from "@app/model/TodoItem.type";
import type { TodoItemInTemplateForm, TodoItemsInTemplateForm } from "@app/model/TodoItemInTemplate.type";
import { AllDurations } from "@app/common/DurationUnit.type";
import { z, type ZodType } from "zod";
import { existingTimeSlotSchema } from "./timeslot.schema";

export const newTodoSchema = z.object({
    name: z.string(),
    description: z.string(),
    typicalDuration: z.number(),
    typicalDurationUnit: z.enum(AllDurations)
}) satisfies ZodType<NewTodoItem>;

export const existingTodoSchema = newTodoSchema.and(z.object({
    id: z.number()
})) satisfies ZodType<ExistingTodoItem>


const todoInTemplateSchema = z.discriminatedUnion("selected", [
    z.object({ selected: z.literal(true), todoItem: existingTodoSchema, timeSlot: existingTimeSlotSchema, pointsInCycle: z.array(z.number()) }),
    z.object({ selected: z.literal(false), todoItem: existingTodoSchema })
]) satisfies ZodType<TodoItemInTemplateForm>;

export const managingExistingTodosSchema = z.object({
    todoItemsInTemplate: z.array(todoInTemplateSchema)
}) satisfies ZodType<TodoItemsInTemplateForm>;
