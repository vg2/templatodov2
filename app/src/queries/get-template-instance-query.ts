import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { getInstance } from "@app/service/get-instance";

export const getTemplateInstanceQueryKey = 'get-template-instance';

export const getTemplateInstanceQueryOptions = (templateId: number | null, date: string) => queryOptions({
  queryKey: [getTemplateInstanceQueryKey, templateId, date],
  queryFn: () => getInstance(templateId, date)
})

export const invalidateAllTemplatesQuery = async () => {
  await queryClient.invalidateQueries({ queryKey: [getTemplateInstanceQueryKey] });
}
