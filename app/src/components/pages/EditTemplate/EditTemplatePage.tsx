import { EditTemplateForm } from "@app/components/organisms/EditTemplateForm";
import { TodoList } from "@app/components/organisms/TodoList";
import { AppRegistration } from "@mui/icons-material";
import { Divider, IconButton, Stack, Typography } from "@mui/joy";
import { useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { getTemplateQueryOptions } from "../../../queries/template-query"

export const EditTemplatePage = () => {
  const { templateId } = useParams({ strict: false });
  const { data: template } = useSuspenseQuery(getTemplateQueryOptions(Number.parseInt(templateId ?? '')));
  const navigate = useNavigate({ from: '/edit-template/$templateId' });

  const manageTodos = () => navigate({ to: './manage-todos' });

  const postSubmit = () => navigate({ to: '/' });

  return (
    <Stack spacing={1}>
      <Typography level='h3'>Edit {template.name}</Typography>
      <EditTemplateForm template={template} onSuccessfulSubmit={postSubmit} />
      <Divider />
      <Stack direction="row" alignItems="center" gap={2}><Typography level='h4'>Todos</Typography> <IconButton onClick={() => manageTodos()} variant="plain"><AppRegistration /><Typography level='title-sm'>Manage</Typography></IconButton></Stack>
      <TodoList todos={template.todos} />
    </Stack>
  )
}

