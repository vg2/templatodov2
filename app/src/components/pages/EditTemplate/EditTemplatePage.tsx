import { EditTemplateForm } from "@app/components/organisms/EditTemplateForm";
import { TodoList } from "@app/components/organisms/TodoList";
import { useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { getTemplateQueryOptions } from "../../../queries/template-query"
import { H3, H4 } from "@/components/atoms/Typography";
import { Separator } from "@/components/atoms/Separator";
import { Button } from "@/components/atoms/Button";
import { FileSliders } from "lucide-react";

export const EditTemplatePage = () => {
  const { templateId } = useParams({ strict: false });
  const { data: template } = useSuspenseQuery(getTemplateQueryOptions(Number.parseInt(templateId ?? '')));
  const navigate = useNavigate({ from: '/edit-template/$templateId' });

  const manageTodos = () => navigate({ to: './manage-todos' });

  const postSubmit = () => navigate({ to: '/' });

  return (
    <div className="flex flex-col gap-2">
      <H3>Edit {template.name}</H3>
      <EditTemplateForm template={template} onSuccessfulSubmit={postSubmit} />
      <Separator />
      <div className="flex flex-row items-center gap-2">
        <H4>Todos</H4>  
        <Button variant='link' onClick={() => manageTodos()}><FileSliders /> Manage</Button>
      </div>
      <TodoList todos={template.todos} />
    </div>
  )
}

