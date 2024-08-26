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
    <TodoToday />
  )
}

export default IndexPage
