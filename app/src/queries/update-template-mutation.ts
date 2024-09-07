import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import type { ExistingTemplate } from "@app/model/Template.type";
import { updateTemplate } from "@app/service/update-template";
import { getTemplatesQueryKey } from "./get-templates-query";

const updateTemplateMutationKey = 'update-template';

export const useUpdateTemplateMutation = () => useMutation({
    mutationKey: [updateTemplateMutationKey],
    mutationFn: (templateForm: Omit<ExistingTemplate, 'todos'>) => updateTemplate(templateForm),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey, variables.id] })
})