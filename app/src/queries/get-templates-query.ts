import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { loadTemplates } from "@app/service/load-templates";

const getAllTemplatesQueryKey = 'get-templates';

export const getAllTemplatesQueryOptions = () => queryOptions({
  queryKey: [getAllTemplatesQueryKey],
  queryFn: () => loadTemplates()
})

export const invalidateAllTemplatesQuery = async () => {
  await queryClient.invalidateQueries({ queryKey: [getAllTemplatesQueryKey] });
}
