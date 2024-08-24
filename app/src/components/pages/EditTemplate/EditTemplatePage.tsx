import { useSuspenseQuery } from "@tanstack/react-query"
import { getTemplateQueryOptions } from "../../../queries/template-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { EditTemplateForm } from "@app/components/organisms/EditTemplateForm";
import { Divider, IconButton, Stack, Typography } from "@mui/joy";
import { TodoList } from "@app/components/organisms/TodoList";
import { AddCircleOutline } from "@mui/icons-material";

export const EditTemplatePage = () => {
  const { templateId } = useParams({ strict: false });
  const { data: template } = useSuspenseQuery(getTemplateQueryOptions(parseInt(templateId!)));
  const navigate = useNavigate({ from: '/edit-template/$templateId' });

  const addTimeSlot = () => navigate({ to: './new-timeslot' });

  const postSubmit = () => navigate({ to: '/' });

  return (
    <Stack spacing={1}>
      <Typography level='h3'>Edit {template.name}</Typography>
      <EditTemplateForm template={template} onSuccessfulSubmit={postSubmit} />
      <Divider />
      <Stack direction="row" alignItems="center"><Typography level='h4'>Todos</Typography> <IconButton onClick={() => addTimeSlot()} variant="plain"><AddCircleOutline /></IconButton></Stack>
      <TodoList todos={template.todos} />
    </Stack>
  )
}

