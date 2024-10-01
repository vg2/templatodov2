import type { Frequency } from "@app/common/Frequency.type";
import type { ExistingTemplate } from "@app/model/Template.type";
import type {
  ActionedItem,
  TemplateInstance,
} from "@app/model/TemplateInstance.type";
import type { ExistingTodoItem } from "@app/model/TodoItem.type";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInCalendarDays,
  endOfDay,
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
import { H1 } from "../atoms/Typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../atoms/Accordion";
import { Button } from "../atoms/Button";
import { Separator } from "../atoms/Separator";
import { Label } from "../atoms/Label";
import { Switch } from "../atoms/Switch";
import { TimelineCardList } from "../molecules/TimelineCardList";
import VerticalTimeline from "../molecules/VerticalTimeline";

const calcPointInCycle = (
  today: Date,
  startDate: Date,
  cycleLength: number,
  cycleFrequency: Frequency,
): number => {
  if (cycleLength === 1) return 1;

  let templateDate = startOfDay(startDate);
  let min = templateDate;
  const compareDate = endOfDay(today);

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
  const { data, isLoading: instancePending } = useSuspenseQuery(
    getAllTemplatesQueryOptions(),
  );
  const today = new Date();

  const [expandedTemplate, setExpandedTemplate] = useState<ExistingTemplate | null>(data.length === 1 ? data[0] : null);

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

  const [timelineView, setTimelineView] = useState<boolean>(false);

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

  const onTemplateExpanded = (templateId: string) => {
    setExpandedTemplate(data.find(t => t.id === Number.parseInt(templateId, 10)) || null);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <H1>Todo today</H1>
        <div className="flex items-center space-x-2 self-center">
          <Switch id="timeline-view" checked={timelineView} onCheckedChange={(e) => setTimelineView(e)}/>
          <Label htmlFor="timeline-view" className="self-center">Timeline view</Label>
        </div>
      </div>
      <Separator className="my-4" />
      {(!data || data.length === 0) && (
        <Button disabled={isPending} onClick={async () => await loadSampleTemplate()}>Load Sample Template</Button>
      )}
      {timelineView ? (
        <VerticalTimeline items={instanceData?.templateSnapshot.todos
            .filter((todo) => todo.pointsInCycle.includes(pointInCycle || -1))
            .map((todo) => ({
              item: todo.todoItem,
              hour: todo.timeSlot.timeOfDay
            })) || []}
        />
      ) : (
        <Accordion onValueChange={onTemplateExpanded} value={expandedTemplate?.id.toString()} type="single" collapsible className="w-full">
          {data.map(template => (
            <AccordionItem key={template.id} value={template.id.toString()}>
              <AccordionTrigger>
                {template.name}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <Button asChild variant='link'>
                  <Link
                    to="/edit-template/$templateId"
                    params={{ templateId: `${template.id}` }}
                  >
                    Edit template
                  </Link>
                </Button>
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
                        openDetails={() => { }}
                      />
                    ))}
                {instancePending && <div>loading</div>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default TodoToday;
