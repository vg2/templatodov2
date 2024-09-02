import { openDb } from "../data/db";

export const dumpData = async () => {
  const db = await openDb(); 
  const templates = await db.getAll('templates');
  console.log(JSON.stringify(templates));
  const timeSlots = await db.getAll('timeSlots');
  console.log(JSON.stringify(timeSlots));
  const todoItems = await db.getAll('todoItems');
  console.log(JSON.stringify(todoItems));
}
