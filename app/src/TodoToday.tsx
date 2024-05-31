import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Grid, Typography } from "@mui/joy"
import { TodoCard } from "./components/TodoCard";
import { useEffect, useState } from "react";
import { TemplateInstance } from "./data/TemplateInstance.type";
import { openDb } from "./data/db";
import { Template } from "./model/Template.type";

const TodoToday = () => {
  const [index, setIndex] = useState<number | null>(null);
  const [data, setData] = useState<Template[]>([]);
  const instanceData: TemplateInstance = { id: '1', date: '2024-05-29', actionedItems: [], templateSnapshot: data[0] };
  const instancePending = false;

  useEffect(() => {
    const loadTemps = async () => {
      const db = await openDb();
      const templates = await db.getAll('templates');
      setData(templates);
    }
    loadTemps();
  }, []);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <Typography level='h2'>To do today</Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        <AccordionGroup>
          {data.map((template, i) =>
          (<Accordion key={template.id} expanded={index === i} onChange={(_, expanded) => setIndex(expanded ? i : null)}>
            <AccordionSummary>{template.name}</AccordionSummary>
            <AccordionDetails>
              {!instancePending && instanceData?.templateSnapshot.timeSlots.map(ts => ts.todoItems.map(todo => (
                <TodoCard
                  key={ts.id}
                  name={todo.name}
                  description={todo.description}
                  timeSlot={ts.name}
                  time={ts.timeOfDay}
                  duration={ts.duration}
                  durationUnit={ts.durationUnit}
                  todoId={todo.id}
                  state="New"
                  markDone={() => { }}
                  openDetails={() => { }}
                />
              )))}
              {instancePending && (<div>loading</div>)}
            </AccordionDetails>
          </Accordion>)
          )}
        </AccordionGroup>
      </Grid>
    </Grid>
  )
}

export default TodoToday;
