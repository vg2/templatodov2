import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Grid, Typography } from "@mui/joy"
import { useState } from "react";
import { format, formatISO } from "date-fns";
import type { ExistingTemplate } from "@app/model/Template.type";
import type { ActionedItem, TemplateInstance } from "@app/model/TemplateInstance.type";
import type { ExistingTodoItem } from "@app/model/TodoItem.type";
import type { TodoState } from "../../common/TodoState";
import { TodoCard } from "../molecules/TodoCard";
import { Link } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getAllTemplatesQueryOptions } from "../../queries/get-templates-query";
import { getTemplateInstanceQueryOptions } from "../../queries/get-template-instance-query";
import { useUpdateInstanceMutation } from "../../queries/update-instance-mutation";
// import { dumpData } from "@app/data/dump-data";

const TodoToday = () => {
  const [expandedTemplate, setExpandedTemplate] = useState<ExistingTemplate| null>(null);
  const { data, isLoading: instancePending } = useSuspenseQuery(getAllTemplatesQueryOptions())
  const { data: instanceData } = useQuery(getTemplateInstanceQueryOptions(expandedTemplate?.id ?? null, format(new Date(), 'yyyy-MM-dd')))

  const { mutateAsync: updateInstanceMutate } = useUpdateInstanceMutation();

  // useEffect(() => {
  //   const dumpAll = async () => {
  //     await dumpData();
  //   }
  //   dumpAll();
  // }, [])

  const currentTodoItemState = (instance: TemplateInstance, todo: ExistingTodoItem): TodoState => {
    const actionedItems = instance.actionedItems;
    const actionedItem = actionedItems.find(ai => ai.todoItemId === todo.id);
    return actionedItem?.state ?? "New";
  }

  const markDoneForInstance = async (instance: TemplateInstance, todo: ExistingTodoItem): Promise<void> => {
    const actioned: ActionedItem = {
      state: 'Complete',
      todoItemId: todo.id ?? 0,
      comment: '',
      timestamp: formatISO(new Date())
    }
    instance.actionedItems.push(actioned);
    await updateInstanceMutate(instance);
  }

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <Typography level='h2'>To do today</Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        <AccordionGroup>
          {data.map((template) =>
          (<Accordion key={template.id} expanded={expandedTemplate?.id === template.id} onChange={(_, expanded) => setExpandedTemplate(expanded ? template : null)}>
            <AccordionSummary>{template.name}</AccordionSummary>
            <AccordionDetails>
              <Link to="/edit-template/$templateId" params={{ templateId: `${template.id}` }}>Edit</Link>
                {!instancePending && instanceData?.templateSnapshot.todos.map(todo => (
                  <TodoCard
                    key={`${todo.timeSlot.id}-${todo.todoItem.id}`}
                    name={todo.todoItem.name}
                    description={todo.todoItem.description}
                    timeSlot={todo.timeSlot.name}
                    time={todo.timeSlot.timeOfDay}
                    duration={todo.timeSlot.duration}
                    durationUnit={todo.timeSlot.durationUnit}
                    todoId={todo.todoItem.id ?? 0}
                    state={currentTodoItemState(instanceData, todo.todoItem)}
                    markDone={() => markDoneForInstance(instanceData, todo.todoItem)}
                    openDetails={() => { }}
                  />
                ))}
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
