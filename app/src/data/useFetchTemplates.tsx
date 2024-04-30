import { useQuery } from "@tanstack/react-query";
import { Template } from "./Template.type";

export const useFetchTemplates: () => { isPending: boolean; error: Error | null; data: Template[] | undefined } = () => {
  const baseUrl = 'http://localhost:8080/template-definitions';
  const templateFetch: () => Promise<Template[]> = () => fetch(baseUrl)
    .then<Template[]>(res => res.json());
  const { isPending, error, data } = useQuery({ queryKey: ['templateDefintions'], queryFn: templateFetch });

  return { isPending, error, data };
}
