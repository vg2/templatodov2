import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Grid, Typography } from "@mui/joy"
import { useFetchTemplates } from "./data/useFetchTemplates";
import { TodoCard } from "./components/TodoCard";
const TodoToday = () => {
  const { data, isPending, error } = useFetchTemplates();

  if (isPending) return <>Loading</>;

  if (error) return <>{error.message}</>;

  if (!data || data.length === 0) return <>no templates found</>;

  console.log(data);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <Typography level='h2'>To do today</Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        <AccordionGroup>
          {data.map(template =>
          (<Accordion key={template.id}>
            <AccordionSummary>{template.name}</AccordionSummary>
            <AccordionDetails>
              {template.timeSlots.map(ts => ts.todoItems.map(todo => (
                <TodoCard 
                    name={todo.name} 
                    description={todo.description} 
                    timeSlot={ts.name}
                    time={ts.timeOfDay}
                    duration={ts.duration} 
                    durationUnit={ts.durationUnit} 
                  />
              )))}
            </AccordionDetails>
          </Accordion>)
          )}
        </AccordionGroup>
      </Grid>
    </Grid>
  )
}

export default TodoToday;
