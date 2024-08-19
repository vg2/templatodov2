import { NewTimeSlotPage } from '@app/components/pages/NewTimeSlot/NewTimeSlotPage';
import { createFileRoute } from '@tanstack/react-router'
import { queryClient } from '../../queries/query-client';
import { getTemplateQueryOptions } from '../../queries/template-query';

export const Route = createFileRoute('/edit-template/$templateId/new-timeslot')({
  component: NewTimeSlotPage,
  loader: ({ params }) => {
    return  queryClient.ensureQueryData(getTemplateQueryOptions(parseInt(params.templateId)));
  }
})
