import type { Frequency } from "@app/common/Frequency.type";
import type { ExistingTemplate } from "@app/model/Template.type";
import type {
  ActionedItem,
  ActionedItemForm,
  TemplateInstance,
} from "@app/model/TemplateInstance.type";
import type { ExistingTodoItem } from "@app/model/TodoItem.type";
import { useQueries, useSuspenseQuery } from "@tanstack/react-query";
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
  parseISO,
  startOfDay,
} from "date-fns";
import { useEffect, useState } from "react";
import type { TodoState } from "../../common/TodoState";
import { getTemplateInstanceQueryOptions } from "../../queries/get-template-instance-query";
import { getAllTemplatesQueryOptions } from "../../queries/get-templates-query";
import { useLoadSampleTemplate } from "../../queries/load-sample-template-mutation";
import { useUpdateInstanceMutation } from "../../queries/update-instance-mutation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../atoms/Accordion";
import { Button } from "../atoms/Button";
import { Label } from "../atoms/Label";
import { Separator } from "../atoms/Separator";
import { Switch } from "../atoms/Switch";
import { H2 } from "../atoms/Typography";
import { TodoCard } from "../molecules/TodoCard";
import VerticalTimeline from "../molecules/VerticalTimeline";
import { ResponsiveDialog } from "../molecules/ResponsiveDialog";
import { ActionTodoForm } from "./ActionTodoForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../atoms/Card";

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
  const difference = (differenceInCalendarDays(today, min) + 1) % cycleLength;
  return difference;
};

const toSortedActionedItems = (actionedItems: ActionedItem[]): ActionedItem[] => actionedItems.toSorted((a, b) => isBefore(parseISO(a.timestamp), parseISO(b.timestamp)) ? 1 : -1);

const TodoToday = () => {
  const { data } = useSuspenseQuery(
    getAllTemplatesQueryOptions(),
  );
  const today = new Date();

  const [expandedTemplate, setExpandedTemplate] = useState<ExistingTemplate | null>(data.length === 1 ? data[0] : null);

  const instanceQueries = data.map(template => getTemplateInstanceQueryOptions(template.key, format(today, "yyyy-MM-dd")));
  const instancesResult = useQueries({ queries: instanceQueries });
  const instances = instancesResult.map(i => i.data).filter(i => !!i);

  const { mutateAsync: updateInstanceMutate } = useUpdateInstanceMutation();
  const { mutateAsync: loadSampleTemplate, isPending } = useLoadSampleTemplate();

  const [timelineView, setTimelineView] = useState<boolean>(localStorage.getItem('tmpltd_isTimelineView') === true.toString());

  useEffect(() => {
    localStorage.setItem('tmpltd_isTimelineView', timelineView.toString());
  }, [timelineView])

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<[TemplateInstance, ExistingTodoItem] | null>(null);

  const itemDetailsClick = (instance: TemplateInstance, todoItem: ExistingTodoItem): void => {
    setShowDetails(true);
    setSelectedItem([instance, todoItem]);
  }

  const submitDetails = async (instance: TemplateInstance, actionedItem: ActionedItemForm): Promise<void> => {
    await updateActionedItem(instance, actionedItem);
    setShowDetails(false);
    setSelectedItem(null);
  }

  const updateActionedItem = async (instance: TemplateInstance, { todoItemKey: todoItemId, state, comment }: ActionedItemForm): Promise<void> => {
    await actionItemForInstance(instance, todoItemId, state, comment);
  }

  const currentTodoItemState = (
    instance: TemplateInstance,
    todo: ExistingTodoItem,
  ): TodoState => {
    const actionedItems = instance.actionedItems;
    const actionedItem = toSortedActionedItems(actionedItems).find((ai) => ai.todoItemKey === todo.key);
    return actionedItem?.state ?? "New";
  };

  const actionItemForInstance = async (instance: TemplateInstance, todoItemId: number, state: TodoState, comment: string): Promise<void> => {
    const actionedItem: ActionedItem = {
      state,
      todoItemKey: todoItemId,
      comment,
      timestamp: formatISO(new Date())
    }
    instance.actionedItems.push(actionedItem);
    await updateInstanceMutate(instance);
  }

  const markDoneForInstance = async (
    instance: TemplateInstance,
    todo: ExistingTodoItem,
  ): Promise<void> => {
    await actionItemForInstance(instance, todo.key, "Complete", "");
  };

  const onTemplateExpanded = (templateId: string) => {
    setExpandedTemplate(data.find(t => t.key === Number.parseInt(templateId, 10)) || null);
  }

  const noData = !data || data.length === 0;

  return (
    <>
      <div className="flex flex-row justify-between">
        <H2 className="border-transparent text-zorba-950">Todo today</H2>
        <div className="flex items-center space-x-2 self-center">
          <Switch disabled={noData} className="data-[state=checked]:bg-zorba-800" id="timeline-view" checked={timelineView} onCheckedChange={(e) => setTimelineView(e)} />
          <Label htmlFor="timeline-view" className="self-center text-zorba-950">Timeline view</Label>
        </div>
      </div>
      <Separator className="my-4 bg-zorba-950" />
      {noData && (
        <Card className="bg-zorba-50">
          <CardHeader>
            <CardTitle>Welcome to templatodo</CardTitle>
            <CardDescription>Get started here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>It's recommended to start with the provided templates, meant for:</p>
            <p className="mx-6 p-1">
              <ul className="list-disc">
                <li>Baby care</li>
                <li>Baby activities</li>
              </ul>
            </p>
            <p>Alternatively, you can start from scratch with a new template.</p>
          </CardContent>
          <CardFooter className="flex flex-row gap-2">
            <Button variant="link" asChild>
              <Link to="/new-template">
                New template
              </Link>
            </Button>
            <Button disabled={isPending} onClick={async () => await loadSampleTemplate()}>Use templates</Button>
          </CardFooter>
        </Card>
      )}
      {timelineView ? (
        <VerticalTimeline items={instances.flatMap(i => i.templateSnapshot.todos
          .filter(todo =>
            todo.pointsInCycle.includes(calcPointInCycle(today, i.templateSnapshot.startDate, i.templateSnapshot.cycleLength, i.templateSnapshot.frequency) || -1),
          )
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          .map(t => ({ templateItem: { item: t, isDone: !!i.actionedItems.find(ai => ai.todoItemKey === t.todoItem.key) }, template: i.templateSnapshot })))} markDone={(t, i) => markDoneForInstance(instances.find(i => i.templateSnapshot.key === t.key)!, i.todoItem)} />

      ) : (
        <Accordion onValueChange={onTemplateExpanded} value={expandedTemplate?.key.toString()} type="single" collapsible className="w-full">
          {data.map(template => (
            <AccordionItem className="border-zorba-300" key={template.key} value={template.key.toString()}>
              <AccordionTrigger>
                {template.name}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <Button asChild variant='link'>
                  <Link
                    to="/edit-template/$templateId"
                    params={{ templateId: `${template.key}` }}
                  >
                    Edit template
                  </Link>
                </Button>
                {instances.find(i => i.templateSnapshot.key === template.key)?.templateSnapshot.todos
                  .filter((todo) =>
                    todo.pointsInCycle.includes(calcPointInCycle(today, template.startDate, template.cycleLength, template.frequency) || -1),
                  )
                  .map((todo) => (
                    <TodoCard
                      key={`${todo.timeSlot.key}-${todo.todoItem.key}`}
                      name={todo.todoItem.name}
                      description={todo.todoItem.description}
                      timeSlot={todo.timeSlot.name}
                      time={todo.timeSlot.timeOfDay}
                      duration={todo.timeSlot.duration}
                      durationUnit={todo.timeSlot.durationUnit}
                      todoId={todo.todoItem.key ?? 0}
                      state={currentTodoItemState(
                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        instances.find(i => i.templateSnapshot.key === template.key)!,
                        todo.todoItem,
                      )}
                      markDone={() =>
                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        markDoneForInstance(instances.find(i => i.templateSnapshot.key === template.key)!, todo.todoItem)
                      }
                      // biome-ignore lint/style/noNonNullAssertion: <explanation>
                      openDetails={() => { itemDetailsClick(instances.find(i => i.templateSnapshot.key === template.key)!, todo.todoItem) }}
                    />
                  ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      <ResponsiveDialog title={selectedItem?.[1]?.name ?? ""} description={selectedItem?.[1]?.description ?? ""} open={showDetails} onOpenChange={setShowDetails}>
        {selectedItem && (
          <ActionTodoForm actionedItem={{
            state: toSortedActionedItems(selectedItem[0].actionedItems).find(ai => ai.todoItemKey === selectedItem[1].key)?.state,
            todoItemKey: selectedItem[1].key,
            comment: toSortedActionedItems(selectedItem[0].actionedItems).find(ai => ai.todoItemKey === selectedItem[1].key)?.comment,
          }} onSubmit={(actionedItem) => submitDetails(selectedItem[0], actionedItem)} />
        )}
      </ResponsiveDialog>
    </>
  );
};

export default TodoToday;
