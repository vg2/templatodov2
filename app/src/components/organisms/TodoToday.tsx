import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Grid, Typography } from "@mui/joy"
import { useEffect, useState } from "react";
import { format, formatISO } from "date-fns";
import { Template } from "@app/model/Template.type";
import { ActionedItem, TemplateInstance } from "@app/model/TemplateInstance.type";
import { loadTemplates } from "@app/service/load-templates";
import { getInstance } from "@app/service/get-instance";
import { TodoItem } from "@app/model/TodoItem.type";
import { TodoState } from "../../common/TodoState";
import { updateInstance } from "@app/service/update-instance";
import { TodoCard } from "../molecules/TodoCard";
import { Link } from "@tanstack/react-router";

const TodoToday = () => {
  const [expandedTemplate, setExpandedTemplate] = useState<Template | null>(null);
  const [data, setData] = useState<Template[]>([]);
  const [instanceData, setInstanceData] = useState<TemplateInstance | null>(null);
  const [instancePending, setInstancePending] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <Link to="/edit-template/$templateId" params={{ templateId: `${template.id}` }}>Edit</Link>
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
