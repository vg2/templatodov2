import { loadTemplate } from "@app/service/load-templates";
import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";

export const getTemplateQueryKey = 'get-template';

export const getTemplateQueryOptions = (templateId: number) => queryOptions({
  queryKey: [getTemplateQueryKey, templateId.toString()],
  queryFn: () => loadTemplate(templateId)
})

export const invalidateTemplateQuery = async (templateId: number) => {
  await queryClient.invalidateQueries({ queryKey: [getTemplateQueryKey, templateId] });
}
