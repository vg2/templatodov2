import { SuspenseLoader } from '@/components/atoms/SuspenseLoader'
import { ManageTemplateTodosPage } from '@app/components/pages/ManageTemplateTodos/ManageTemplateTodosPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit-template/$templateId/manage-todos')({
  component: () => <SuspenseLoader><ManageTemplateTodosPage /></SuspenseLoader>,
})
