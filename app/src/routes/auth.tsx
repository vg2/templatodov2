import AuthRedirectPage from '@/components/pages/Auth/AuthRedirectPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: () => <AuthRedirectPage />
})
