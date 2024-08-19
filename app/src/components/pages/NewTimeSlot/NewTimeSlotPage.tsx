import { useNavigate, useParams } from "@tanstack/react-router"
import { TimeSlotForm } from "@app/components/organisms/TimeSlotForm";
import { Stack, Typography } from "@mui/joy";
import { TimeSlot } from "@app/model/TimeSlot.type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTemplateQueryOptions, invalidateTemplateQuery } from "../../../queries/template-query";
import { addTimeSlotToTemplate } from "@app/service/add-timeslot-to-template";

export const NewTimeSlotPage = () => {
    const { templateId } = useParams({ strict: false });
    const { data: template } = useSuspenseQuery(getTemplateQueryOptions(parseInt(templateId!)));
    const navigate = useNavigate({ from: '/new-template' });

    const postSubmit = async (timeSlotId: number) => {
        const templateIdParsed = parseInt(templateId!);
        await addTimeSlotToTemplate(templateIdParsed, timeSlotId);
        await invalidateTemplateQuery(templateIdParsed);
        navigate({ to: '/edit-template/$templateId', params: { templateId: templateId! } });
    }
    const timeSlot: TimeSlot = {
        name: '',
        duration: 0,
        timeOfDay: '07:00:00',
        description: '',
        durationUnit: 'Minutes',
        todoItems: []
    }

    return (
        <Stack spacing={1}>
            <Typography level='h3'>Add timeslot to {template.name}</Typography>
            <TimeSlotForm timeSlot={timeSlot} onSuccessfulSubmit={async (timeSlotId) => { postSubmit(timeSlotId) }} />
        </Stack>
    )
}

