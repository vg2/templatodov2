import { TodoItem } from "@app/model/TodoItem.type";
import { TodoItemInTemplateForm, TodoItemsInTemplateForm } from "@app/model/TodoItemInTemplate.type";
import { AllDurations } from "@app/common/DurationUnit.type";
import { z, ZodType } from "zod";
import { timeSlotSchema } from "./timeslot.schema";

export const todoSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string(),
    typicalDuration: z.number(),
    typicalDurationUnit: z.enum(AllDurations)
}) satisfies ZodType<TodoItem>;


const todoInTemplateSchema = z.discriminatedUnion("selected", [
    z.object({ selected: z.literal(true), todoItem: todoSchema, timeSlot: timeSlotSchema, pointsInCycle: z.array(z.number()) }),
    z.object({ selected: z.literal(false), todoItem: todoSchema })
]) satisfies ZodType<TodoItemInTemplateForm>;

export const managingExistingTodosSchema = z.object({
    todoItemsInTemplate: z.array(todoInTemplateSchema)
}) satisfies ZodType<TodoItemsInTemplateForm>;
