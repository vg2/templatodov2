import './IndexPage.css'
import TodoToday from '@app/components/organisms/TodoToday';
import { openDb } from '@app/data/db';
import { useEffect } from 'react';

function IndexPage() {
  useEffect(() => {
    const setupDb = async () => {
      await openDb();
    }
    setupDb();
  }, []);



  return (
    <TodoToday />
  )
}

export default IndexPage
