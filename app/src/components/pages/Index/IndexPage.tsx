import { Sheet, Typography } from '@mui/joy'
import './IndexPage.css'
import { useEffect } from 'react';
import { openDb } from '@app/data/db';
import seedData from '@app/data/seed-data';
import TodoToday from '@app/components/organisms/TodoToday';

function IndexPage() {
  useEffect(() => {
    const setupDb = async () => {
      const db = await openDb();
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

export default IndexPage
