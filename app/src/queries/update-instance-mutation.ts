import type { TemplateInstance } from "@app/model/TemplateInstance.type";
import { updateInstance } from "@app/service/update-instance";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { getTemplateInstanceQueryKey } from "./get-template-instance-query";

const updateInstanceMutationKey = 'update-instance';

export const useUpdateInstanceMutation = () => useMutation({
    mutationKey: [updateInstanceMutationKey],
    mutationFn: (instance: TemplateInstance) => updateInstance(instance),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: [getTemplateInstanceQueryKey, variables.templateSnapshot.id, variables.date] })
})