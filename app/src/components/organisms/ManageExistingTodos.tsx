import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusCircle, Save } from "lucide-react";
import { getAllTimeslotsQueryOptions } from "../../queries/all-timeslots-query";
import { managingExistingTodosSchema } from "./manage-existing-todos.schema";
import { AddTodoForm } from "./AddTodoForm";
import { TimeSlotForm } from "./TimeSlotForm";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/atoms/Form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/Select";
import { Dialog, DialogContent, DialogTitle } from "@/components/atoms/Dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import type { ExistingTemplate } from "@app/model/Template.type";
import type { ExistingTodoItem } from "@app/model/TodoItem.type";
import type { TodoItemInTemplate, TodoItemInTemplateForm, TodoItemsInTemplateForm } from "@app/model/TodoItemInTemplate.type";
import { MultiSelect } from "../atoms/MultiSelect";
import { FloatingActionButton, FloatingActionButtonContainer } from "../molecules/FloatingActionButton";
import { H2 } from "../atoms/Typography";
import { Separator } from "../atoms/Separator";
import { ResponsiveDialog } from "../molecules/ResponsiveDialog";

type ManagingExistingTodosInput = {
  allTodos: ExistingTodoItem[];
  template: ExistingTemplate;
  save: (todosInTemplate: TodoItemInTemplate[]) => Promise<void>;
};

const getDefaultFormValues = (
  allTodos: ExistingTodoItem[],
  todosInTemplate: TodoItemInTemplate[],
): TodoItemsInTemplateForm => {
  const formTodos: TodoItemInTemplateForm[] = allTodos.map((todo) => {
    const alreadyInTemplate = todosInTemplate.find(
      (x) => x.todoItem.id && x.todoItem.id === todo.id,
    );
    return alreadyInTemplate
      ? { ...alreadyInTemplate, selected: true }
      : { todoItem: todo, selected: false };
  });

  return { todoItemsInTemplate: formTodos };
};

export const ManageExistingTodos = ({
  allTodos: todos,
  template,
  save,
}: ManagingExistingTodosInput) => {
  const { data: timeSlots } = useSuspenseQuery(getAllTimeslotsQueryOptions());

  const [addTodoModalIsOpen, setAddTodoModalIsOpen] = useState<boolean>(false);
  const [addTimeslotModalIsOpen, setAddTimeslotModalIsOpen] = useState<boolean>(false);

  const form = useForm<TodoItemsInTemplateForm>({
    resolver: zodResolver(managingExistingTodosSchema),
    defaultValues: getDefaultFormValues(todos, template.todos),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "todoItemsInTemplate",
  });

  const onSubmit = async (data: TodoItemsInTemplateForm) => {
    await save(data.todoItemsInTemplate.filter((t) => t.selected) as TodoItemInTemplate[]);
  };

  const handleTimeslotChange = (onChange: (value: unknown) => void, value: string) => {
    if (value === "-1") {
      openAddTimeslotModal();
      return;
    }
    const timeSlot = timeSlots.find((t) => t.id === Number.parseInt(value, 10));
    onChange(timeSlot);
  };

  const pointsInCycle = Array.from({ length: template.cycleLength }, (_, i) => i + 1);

  const openAddTodoModal = () => setAddTodoModalIsOpen(true);
  const closeAddTodoModal = () => setAddTodoModalIsOpen(false);

  const openAddTimeslotModal = () => setAddTimeslotModalIsOpen(true);
  const closeAddTimeslotModal = () => setAddTimeslotModalIsOpen(false);

  return (
    <>
      <H2 className="mb-4 border-transparent font-bold text-2xl text-zorba-800">Todos</H2>
      <Separator className="my-4 bg-zorba-950" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Card key={field.id} className="mb-4 bg-cloud-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name={`todoItemsInTemplate.${index}.selected`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div>
                    <CardTitle>{field.todoItem.name}</CardTitle>
                    <CardDescription>{field.todoItem.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {form.watch(`todoItemsInTemplate.${index}.selected`) && (
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name={`todoItemsInTemplate.${index}.timeSlot`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select
                            onValueChange={(value) => handleTimeslotChange(field.onChange, value)}
                            value={field.value?.id?.toString()}
                          >
                            <SelectTrigger className="bg-cloud-100">
                              <SelectValue placeholder="Select timeslot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((ts) => (
                                <SelectItem key={ts.id} value={ts.id.toString()}>
                                  {ts.name} | {ts.description}
                                </SelectItem>
                              ))}
                              <SelectItem value="-1">Add new timeslot...</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`todoItemsInTemplate.${index}.pointsInCycle`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <MultiSelect
                            className="bg-cloud-100"
                            options={pointsInCycle.map((point) => ({ key: point.toString(), label: point.toString(), value: point.toString() }))}
                            defaultValue={field.value?.map?.(v => v.toString()) || []}
                            onValueChange={(value) => field.onChange(value.map(val => Number.parseInt(val, 10)))}
                            maxCount={1}
                            placeholder="Select points in cycle"
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </form>
      </Form>

      <ResponsiveDialog title="Add todo" description="" open={addTodoModalIsOpen} onOpenChange={setAddTodoModalIsOpen}>
        <AddTodoForm onSubmit={closeAddTodoModal} />
      </ResponsiveDialog>

      <ResponsiveDialog open={addTimeslotModalIsOpen} onOpenChange={setAddTimeslotModalIsOpen} title="Add timeslot" description="">
        <TimeSlotForm timeSlot={{ templateId: template.id }} onSuccessfulSubmit={closeAddTimeslotModal} />
      </ResponsiveDialog>

      <FloatingActionButtonContainer>
        <FloatingActionButton className="bg-zorba-950" icon={<PlusCircle className="h-4 w-4" />} onClick={openAddTodoModal} />
        <FloatingActionButton className="bg-zorba-950" icon={<Save className="h-4 w-4" />} onClick={form.handleSubmit(onSubmit)} />
      </FloatingActionButtonContainer>
    </>
  );
};
