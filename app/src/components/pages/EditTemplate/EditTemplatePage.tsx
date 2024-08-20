import { useSuspenseQuery } from "@tanstack/react-query"
import { getTemplateQueryOptions } from "../../../queries/template-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { EditTemplateForm } from "@app/components/organisms/EditTemplateForm";
import { TimeSlotForm } from "@app/components/organisms/TimeSlotForm";
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Divider, IconButton, Stack, Typography } from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';

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
      <Stack direction="row" alignItems="center"><Typography level='h4'>Time Slots</Typography> <IconButton onClick={() => addTimeSlot()} variant="plain"><AddIcon /></IconButton></Stack>
      <AccordionGroup>
        {
          template.todos.map((todo => (
            <Accordion key={todo.timeSlot.id}>
              <AccordionSummary>{todo.timeSlot.name} | {todo.timeSlot.description}</AccordionSummary>
              <AccordionDetails>
                <TimeSlotForm timeSlot={todo.timeSlot} onSuccessfulSubmit={async () => { }} />
              </AccordionDetails>
            </Accordion>
          )))
        }
      </AccordionGroup>
    </Stack>
  )
}

