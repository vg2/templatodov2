import TodoToday from '@/components/organisms/TodoToday';
import './IndexPage.css'
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
