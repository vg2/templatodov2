import { useMutation } from "@tanstack/react-query";
import { getTemplatesQueryKey } from "./get-templates-query";
import { queryClient } from "./query-client";
import type { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { saveTodosInTemplate } from "@app/service/save-todos-in-template";

const saveTodosInTemplateMutationKey = 'save-todos-in-template';
type MutateArgs = { templateId: number, todoItemsInTemplate: TodoItemInTemplate[] };

export const useSaveTodosInTemplateMutation = () => useMutation({
    mutationKey: [saveTodosInTemplateMutationKey],
    mutationFn: ({ templateId, todoItemsInTemplate }: MutateArgs) => saveTodosInTemplate(templateId, todoItemsInTemplate),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey, variables.templateId] })
})
