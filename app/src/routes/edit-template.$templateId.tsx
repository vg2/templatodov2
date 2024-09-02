import { createFileRoute } from '@tanstack/react-router'
import { queryClient } from '../queries/query-client';
import { getTemplateQueryOptions } from '../queries/template-query';
import { EditTemplatePage } from '@app/components/pages/EditTemplate/EditTemplatePage';

export const Route = createFileRoute('/edit-template/$templateId')({
  component: EditTemplatePage,
  loader: ({ params }) => {
    return  queryClient.ensureQueryData(getTemplateQueryOptions(Number.parseInt(params.templateId, 10)));
  }
})
