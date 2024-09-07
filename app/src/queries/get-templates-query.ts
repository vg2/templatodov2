import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { loadTemplates } from "@app/service/load-templates";

export const getTemplatesQueryKey = 'get-templates';

export const getAllTemplatesQueryOptions = () => queryOptions({
  queryKey: [getTemplatesQueryKey],
  queryFn: () => loadTemplates()
})

export const invalidateAllTemplatesQuery = async () => {
  await queryClient.invalidateQueries({ queryKey: [getTemplatesQueryKey] });
}
