import { createLazyFileRoute } from '@tanstack/react-router'
import IndexPage from '../components/pages/Index/IndexPage';

export const Route = createLazyFileRoute('/')({
  component: IndexPage,
})
