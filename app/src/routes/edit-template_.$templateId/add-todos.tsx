import { AddTemplateTodosPage } from '@app/components/pages/AddTemplateTodos/AddTemplateTodosPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit-template/$templateId/add-todos')({
  component: AddTemplateTodosPage
})
