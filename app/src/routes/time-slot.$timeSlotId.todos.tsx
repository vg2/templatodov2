import { TimeSlotTodosPage } from '@app/components/pages/TimeSlotTodos/TimeSlotTodosPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/time-slot/$timeSlotId/todos')({
  component: () => <TimeSlotTodosPage/>
})
