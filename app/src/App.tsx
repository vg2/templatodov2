import { Sheet, Typography } from '@mui/joy'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoToday from './TodoToday';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Sheet variant='soft' color='primary' sx={{padding: 1}}>
        <Typography level='h1'>Templatodo</Typography>
      </Sheet>
      <TodoToday/>
    </QueryClientProvider>
  )
}

export default App
