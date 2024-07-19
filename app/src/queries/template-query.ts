import { loadTemplate } from "@app/service/load-templates";
import { queryOptions } from "@tanstack/react-query";

export const getTemplateQueryOptions = (templateId: number) => queryOptions({
  queryKey: ['get-template', templateId.toString()],
  queryFn: () => loadTemplate(templateId)
})
