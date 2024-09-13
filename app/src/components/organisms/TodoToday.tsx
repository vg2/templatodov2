import type { Frequency } from "@app/common/Frequency.type";
import type { ExistingTemplate } from "@app/model/Template.type";
import type {
  ActionedItem,
  TemplateInstance,
} from "@app/model/TemplateInstance.type";
import type { ExistingTodoItem } from "@app/model/TodoItem.type";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/joy";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInCalendarDays,
  format,
  formatISO,
  isBefore,
  startOfDay,
} from "date-fns";
import { useState } from "react";
import type { TodoState } from "../../common/TodoState";
import { getTemplateInstanceQueryOptions } from "../../queries/get-template-instance-query";
import { getAllTemplatesQueryOptions } from "../../queries/get-templates-query";
import { useLoadSampleTemplate } from "../../queries/load-sample-template-mutation";
import { useUpdateInstanceMutation } from "../../queries/update-instance-mutation";
import { TodoCard } from "../molecules/TodoCard";

const calcPointInCycle = (
  today: Date,
  startDate: Date,
  cycleLength: number,
  cycleFrequency: Frequency,
): number => {
  let templateDate = startDate;
  let min = templateDate;
  const compareDate = startOfDay(today);

  while (isBefore(templateDate, compareDate)) {
    min = templateDate;
    switch (cycleFrequency) {
      case "Daily":
        templateDate = addDays(templateDate, cycleLength);
        break;
      case "Weekly":
        templateDate = addWeeks(templateDate, cycleLength);
        break;
      case "Monthly":
        templateDate = addMonths(templateDate, cycleLength);
        break;
    }
  }
  const difference = differenceInCalendarDays(today, min);
  return difference;
};

const TodoToday = () => {
  const [expandedTemplate, setExpandedTemplate] =
    useState<ExistingTemplate | null>(null);
  const { data, isLoading: instancePending } = useSuspenseQuery(
    getAllTemplatesQueryOptions(),
  );
  const today = new Date();
  const { data: instanceData } = useQuery(
    getTemplateInstanceQueryOptions(
      expandedTemplate?.id ?? null,
      format(today, "yyyy-MM-dd"),
    ),
  );

  const pointInCycle = expandedTemplate
    ? calcPointInCycle(
        today,
        expandedTemplate.startDate,
        expandedTemplate.cycleLength,
        expandedTemplate.frequency,
      )
    : undefined;

  const { mutateAsync: updateInstanceMutate } = useUpdateInstanceMutation();
  const { mutateAsync: loadSampleTemplate, isPending } = useLoadSampleTemplate();

  const currentTodoItemState = (
    instance: TemplateInstance,
    todo: ExistingTodoItem,
  ): TodoState => {
    const actionedItems = instance.actionedItems;
    const actionedItem = actionedItems.find((ai) => ai.todoItemId === todo.id);
    return actionedItem?.state ?? "New";
  };

  const markDoneForInstance = async (
    instance: TemplateInstance,
    todo: ExistingTodoItem,
  ): Promise<void> => {
    const actioned: ActionedItem = {
      state: "Complete",
      todoItemId: todo.id ?? 0,
      comment: "",
      timestamp: formatISO(new Date()),
    };
    instance.actionedItems.push(actioned);
    await updateInstanceMutate(instance);
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <Typography level="h2">To do today</Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        {(!data || data.length === 0) && (
          <Button disabled={isPending} onClick={async () => await loadSampleTemplate()}>Load Sample Template</Button>
        )}
        <AccordionGroup>
          {data.map((template) => (
            <Accordion
              key={template.id}
              expanded={expandedTemplate?.id === template.id}
              onChange={(_, expanded) =>
                setExpandedTemplate(expanded ? template : null)
              }
            >
              <AccordionSummary>{template.name}</AccordionSummary>
              <AccordionDetails>
                <Link
                  to="/edit-template/$templateId"
                  params={{ templateId: `${template.id}` }}
                >
                  Edit
                </Link>
                {!instancePending &&
                  instanceData?.templateSnapshot.todos
                    .filter((todo) =>
                      todo.pointsInCycle.includes(pointInCycle || -1),
                    )
                    .map((todo) => (
                      <TodoCard
                        key={`${todo.timeSlot.id}-${todo.todoItem.id}`}
                        name={todo.todoItem.name}
                        description={todo.todoItem.description}
                        timeSlot={todo.timeSlot.name}
                        time={todo.timeSlot.timeOfDay}
                        duration={todo.timeSlot.duration}
                        durationUnit={todo.timeSlot.durationUnit}
                        todoId={todo.todoItem.id ?? 0}
                        state={currentTodoItemState(
                          instanceData,
                          todo.todoItem,
                        )}
                        markDone={() =>
                          markDoneForInstance(instanceData, todo.todoItem)
                        }
                        openDetails={() => {}}
                      />
                    ))}
                {instancePending && <div>loading</div>}
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionGroup>
      </Grid>
    </Grid>
  );
};

export default TodoToday;
