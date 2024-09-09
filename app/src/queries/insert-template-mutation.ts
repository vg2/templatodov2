import type { NewTemplate } from "@app/model/Template.type";
import { insertTemplate } from "@app/service/insert-template";
import { useMutation } from "@tanstack/react-query";
import { getTemplatesQueryKey } from "./get-templates-query";
import { queryClient } from "./query-client";

const insertTemplateMutationKey = 'insert-template';

export const useInsertTemplateMutation = () => useMutation({
    mutationKey: [insertTemplateMutationKey],
    mutationFn: (templateForm: NewTemplate) => insertTemplate(templateForm),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey] })
})
