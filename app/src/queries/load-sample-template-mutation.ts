import type { DbTemplate } from "@app/data/DbTemplate.type";
import type { DbTimeSlot } from "@app/data/DbTimeSlot.type";
import type { TodoItem } from "@app/model/TodoItem.type";
import { getSampleTemplate } from "@app/service/get-sample-template";
import { getSampleTimeSlots } from "@app/service/get-sample-timeslots";
import { getSampleTodoItems } from "@app/service/get-sample-todo-items";
import { insertTemplate } from "@app/service/insert-template";
import { insertTimeSlot } from "@app/service/insert-timeslot";
import { insertTodo } from "@app/service/insert-todo";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { getTemplatesQueryKey } from "./get-templates-query";

export const loadSampleTemplateMutationKey = 'load-sample-template';

export const useLoadSampleTemplate = () => useMutation({
  mutationKey: [loadSampleTemplateMutationKey],
  mutationFn: async () => {
    const sampleTemplates = await getSampleTemplate();
    const templates: DbTemplate[] = await sampleTemplates.json();
    const insertAll = [];
    insertAll.push(templates.map(t => insertTemplate(t)));

    const sampleTimeslots = await getSampleTimeSlots();
    const timeslots: DbTimeSlot[] = await sampleTimeslots.json();
    insertAll.push(timeslots.map(ts => insertTimeSlot(ts)));

    const sampleTodoItems = await getSampleTodoItems();
    const todoItems: TodoItem[] = await sampleTodoItems.json();
    insertAll.push(todoItems.map(todo => insertTodo(todo)));

    return Promise.all(insertAll);
  }, 
  onSuccess: () => queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey] })
})

