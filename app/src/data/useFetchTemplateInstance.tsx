
import { useQuery } from "@tanstack/react-query";
import { TemplateInstance } from "./TemplateInstance.type";

export const useFetchTemplateInstance: (templateDefId: string | undefined, instanceDate: string) => { isPending: boolean; error: Error | null; data: TemplateInstance | undefined | null } = (templateDefId, instanceDate) => {
  const baseUrl = 'http://localhost:8080/template-instances';
  const templateFetch: () => Promise<TemplateInstance | null> = () => {
    if (!templateDefId || !instanceDate) return Promise.resolve<TemplateInstance | null>(null);
    return fetch(`${baseUrl}/${templateDefId}/instance/${instanceDate}`)
      .then<TemplateInstance>(res => res.json());
  }

  const { isPending, error, data } = useQuery({ queryKey: ['templateInstance', templateDefId, instanceDate], queryFn: templateFetch });

  return { isPending, error, data };
}
