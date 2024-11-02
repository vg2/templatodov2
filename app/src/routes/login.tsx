import LoginPage from '@/components/pages/Auth/LoginPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: () => <LoginPage />
})
