import { insertTemplate } from "@app/service/insert-template";
import { useMutation } from "@tanstack/react-query";
import { getTemplatesQueryKey } from "./get-templates-query";
import { queryClient } from "./query-client";
import type { DbTemplate } from "@app/data/DbTemplate.type";

const insertTemplateMutationKey = 'insert-template';

export const useInsertTemplateMutation = () => useMutation({
    mutationKey: [insertTemplateMutationKey],
    mutationFn: (templateForm: DbTemplate) => insertTemplate(templateForm),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey] })
})
