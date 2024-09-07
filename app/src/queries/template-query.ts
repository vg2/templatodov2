import { loadTemplate } from "@app/service/load-templates";
import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { getTemplatesQueryKey } from "./get-templates-query";

export const getTemplateQueryOptions = (templateId: number) => queryOptions({
  queryKey: [getTemplatesQueryKey, templateId.toString()],
  queryFn: () => loadTemplate(templateId)
})

export const invalidateTemplateQuery = async (templateId: number) => {
  await queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey, templateId] });
}
