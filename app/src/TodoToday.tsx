import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Grid, Typography } from "@mui/joy"
import { useFetchTemplates } from "./data/useFetchTemplates";
import { TodoCard } from "./components/TodoCard";
import { useState } from "react";
import { format } from "date-fns/format";
import { useFetchTemplateInstance } from "./data/useFetchTemplateInstance";
const TodoToday = () => {
  const { data, isPending, error } = useFetchTemplates();
  const [index, setIndex] = useState<number | null>(null);

  const today = format(new Date(), 'yyyy-MM-dd');

  const { data: instanceData, isPending: instancePending  } = useFetchTemplateInstance(data && data[index ?? 0].id, today);


  if (isPending) return <>Loading</>;

  if (error) return <>{error.message}</>;

  if (!data || data.length === 0) return <>no templates found</>;


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
