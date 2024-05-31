import { Sheet, Typography } from '@mui/joy'
import './App.css'
import TodoToday from './TodoToday';
import { initDb } from './data/db';
import { useEffect } from 'react';
import seedData from './data/seed-data';

function App() {
  useEffect(() => {
    const setupDb = async () => {
      const db = await initDb();
      await seedData(db);
    }
    setupDb();
  }, []);

  return (
    <>
      <Sheet variant='soft' color='primary' sx={{ padding: 1 }}>
        <Typography level='h1'>Templatodo</Typography>
      </Sheet>
      <TodoToday />
    </>
  )
}

export default App
