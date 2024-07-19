import { NewTemplatePage } from '@app/components/pages/NewTemplate/NewTemplatePage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/new-template')({
  component: NewTemplatePage,
})
