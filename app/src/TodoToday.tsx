import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Grid, Typography } from "@mui/joy"
import { TodoCard } from "./components/TodoCard";
import { useEffect, useState } from "react";
import { Template } from "./model/Template.type";
import { ActionedItem, TemplateInstance } from "./model/TemplateInstance.type";
import { loadTemplates } from "./service/load-templates";
import { format, formatISO } from "date-fns";
import { getInstance } from "./service/get-instance";
import { TodoState } from "./common/TodoState";
import { TodoItem } from "./model/TodoItem.type";
import { updateInstance } from "./service/update-instance";

const TodoToday = () => {
  const [expandedTemplate, setExpandedTemplate] = useState<Template | null>(null);
  const [data, setData] = useState<Template[]>([]);
  const [instanceData, setInstanceData] = useState<TemplateInstance | null>(null);
  const [instancePending, setInstancePending] = useState<boolean>(false);
  const [refreshInstance, setRefreshInstance] = useState<any>(null);

  useEffect(() => {
    const loadTemps = async () => {
      const templates = await loadTemplates();
      setData(templates);
    }
    loadTemps();
  }, []);

  useEffect(() => {
    if (expandedTemplate === null) {
      setInstanceData(() => null);
      setInstancePending(() => false);
      return;
    }

    setInstancePending(true);
    const loadInstance = async () => {
      const templateInstance = await getInstance(expandedTemplate.id!, format(new Date(), 'yyyy-MM-dd'));
      setInstancePending(false);
      setInstanceData(templateInstance);
    }
    loadInstance();
  }, [expandedTemplate, setInstanceData, setInstancePending, refreshInstance])

  const currentTodoItemState = (instance: TemplateInstance, todo: TodoItem): TodoState => {
    const actionedItems = instance.actionedItems;
    const actionedItem = actionedItems.find(ai => ai.todoItemId === todo.id);
    return actionedItem?.state ?? "New";
  }

  const markDoneForInstance = async (instance: TemplateInstance, todo: TodoItem): Promise<void> => {
    const actioned: ActionedItem = {
      state: 'Complete',
      todoItemId: todo.id,
      comment: '',
      timestamp: formatISO(new Date())
    }
    instance.actionedItems.push(actioned);
    await updateInstance(instance);
    setRefreshInstance({});
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
                  state={currentTodoItemState(instanceData, todo)}
                  markDone={() => markDoneForInstance(instanceData, todo)}
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
