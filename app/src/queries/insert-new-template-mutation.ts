
import { useMutation } from "@tanstack/react-query";
import { getTemplatesQueryKey } from "./get-templates-query";
import { queryClient } from "./query-client";
import { insertNewTemplate } from "@app/service/insert-new-template";
import type { NewTemplateForm } from "@app/model/Template.type";

const insertNewTemplateMutationKey = 'insert-new-template';

export const useInsertNewTemplateMutation = () => useMutation({
    mutationKey: [insertNewTemplateMutationKey],
    mutationFn: (templateForm: NewTemplateForm) => insertNewTemplate(templateForm),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey] })
})
