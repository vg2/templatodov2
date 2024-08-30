import { TodoItem } from "@app/model/TodoItem.type";
import { Template } from "@app/model/Template.type";
import {
  TodoItemInTemplate,
  TodoItemInTemplateForm,
  TodoItemsInTemplateForm,
} from "@app/model/TodoItemInTemplate.type";
import {
  Checkbox,
  DialogContent,
  DialogTitle,
  Input,
  FormLabel,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
  Textarea,
  Button,
} from "@mui/joy";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  managingExistingTodosSchema,
  todoSchema,
} from "./manage-existing-todos.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllTimeslotsQueryOptions } from "../../queries/all-timeslots-query";
import { TimeSlot } from "@app/model/TimeSlot.type";
import FloatingActionButton from "../atoms/FloatingActionButton";
import { useState } from "react";
import { AllDurations, DurationUnit } from "@app/common/DurationUnit.type";

type ManagingExistingTodosInput = {
  allTodos: TodoItem[];
  template: Template;
  save: (todosInTemplate: TodoItemInTemplate[]) => Promise<void>;
};

const getDefaultFormValues = (
  allTodos: TodoItem[],
  todosInTemplate: TodoItemInTemplate[]
): TodoItemsInTemplateForm => {
  const formTodos: TodoItemInTemplateForm[] = allTodos.map((todo) => {
    const alreadyInTemplate = todosInTemplate.find(
      (x) => x.todoItem.id && x.todoItem.id === todo.id
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

  const defaultValues = getDefaultFormValues(todos, template.todos);
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);

  const form = useForm<
    TodoItemsInTemplateForm,
    Validator<TodoItemsInTemplateForm | unknown>
  >({
    validatorAdapter: zodValidator(),
    validators: {
      onChange: managingExistingTodosSchema,
      onSubmit: managingExistingTodosSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await save(value.todoItemsInTemplate as TodoItemInTemplate[]);
      // const timeSlotId = await saveTimeSlot(value);
    },
    defaultValues: defaultValues,
  });

  const todoForm = useForm<TodoItem, Validator<TodoItem | unknown>>({
    validatorAdapter: zodValidator(),
    validators: { onChange: todoSchema, onSubmit: todoSchema },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const handleTimeslotChange = (
    formChangeHandler: (updater: unknown) => void,
    timeSlotId: number | null
  ) => {
    const timeSlot = timeSlots.find((t) => t.id === timeSlotId);
    formChangeHandler(timeSlot);
  };

  const handlePointsInCycleChange = (
    formChangeHandler: (updater: unknown) => void,
    selectedPoints: number[] | null
  ) => {
    formChangeHandler(selectedPoints);
  };

  const pointsInCycle = Array.from(
    { length: template.cycleLength },
    (_, i) => i + 1
  );

  // const formValues = form.useStore(x => x.values.todoItemsInTemplate);
  // const isSelected = (todoItemId: number) => formValues.some(f => f.selected && f.todoItem.id === todoItemId);
  const isSelected = () => true;

  const openAddModal = () => setAddModalIsOpen(true);
  const closeAddModal = () => setAddModalIsOpen(false);

  return (
    <>
      <Typography level="title-md">Todos</Typography>
      <div role="group" aria-labelledby="template-todos-group">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <List>
            <form.Field name="todoItemsInTemplate" mode="array">
              {(field) =>
                field.state.value.map((_, i) => (
                  <ListItem key={i}>
                    <ListItemButton>
                      <ListItemDecorator>
                        <form.Field name={`todoItemsInTemplate[${i}].selected`}>
                          {(subField) => {
                            return (
                              <Checkbox
                                checked={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.checked)
                                }
                              />
                            );
                          }}
                        </form.Field>
                      </ListItemDecorator>
                      <Stack direction="column" gap={1}>
                        <Typography level="title-sm">
                          {field.state.value[i].todoItem!.name}
                        </Typography>
                        <Typography level="body-sm">
                          {field.state.value[i].todoItem!.description}
                        </Typography>
                        {isSelected() && (
                          <Stack
                            direction="row"
                            gap={1}
                            sx={{
                              width: "100%",
                              "& > *": {
                                width: "50%",
                                flex: 1,
                              },
                            }}
                          >
                            <form.Field
                              name={`todoItemsInTemplate[${i}].timeSlot`}
                            >
                              {(subField) => (
                                <Select
                                  value={(subField.state.value as TimeSlot)?.id}
                                  onChange={(_, val) =>
                                    handleTimeslotChange(
                                      subField.handleChange,
                                      val
                                    )
                                  }
                                >
                                  {timeSlots.map((ts) => (
                                    <Option
                                      key={ts.id!}
                                      value={ts.id}
                                      label={ts.name}
                                    >
                                      {ts.name} | {ts.description}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            </form.Field>
                            <form.Field
                              name={`todoItemsInTemplate[${i}].pointsInCycle`}
                            >
                              {(subField) => (
                                <Select
                                  value={subField.state.value as number[]}
                                  multiple
                                  onChange={(_, val) =>
                                    handlePointsInCycleChange(
                                      subField.handleChange,
                                      val! as number[]
                                    )
                                  }
                                >
                                  {pointsInCycle.map((point) => (
                                    <Option key={point} value={point}>
                                      {point}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            </form.Field>
                          </Stack>
                        )}
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </form.Field>
          </List>
        </form>
      </div>
      <Modal open={addModalIsOpen} onClose={closeAddModal}>
        <ModalDialog>
          <DialogTitle>Add todo</DialogTitle>
          <DialogContent>Add a new todo</DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              todoForm.handleSubmit();
            }}
          >
            <Stack direction="column" gap={1}>
              <todoForm.Field
                name="name"
                children={(field) => (
                  <FormControl error={field.state.meta.errors.length > 0}>
                    <FormLabel>Todo name</FormLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Todo name"
                    />
                  </FormControl>
                )}
              />

              <todoForm.Field
                name="description"
                children={(field) => (
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      minRows={2}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Description"
                    />
                  </FormControl>
                )}
              />
              <Stack
                direction="row"
                gap={1}
                sx={{
                  width: "100%",
                  "& > *": {
                    width: "50%",
                    flex: 1,
                  },
                }}
              >
                <todoForm.Field
                  name="typicalDuration"
                  children={(field) => (
                    <FormControl>
                      <FormLabel>Typical duration</FormLabel>
                      <Input
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(parseInt(e.target.value))
                        }
                        placeholder="Typical Duration"
                      />
                    </FormControl>
                  )}
                />
                <todoForm.Field
                  name="typicalDurationUnit"
                  children={(field) => (
                    <FormControl>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        defaultValue="Minutes"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(_, val) =>
                          val &&
                          field.handleChange(val as DurationUnit)
                        }
                        placeholder="Unit"
                      >
                        {AllDurations.map(duration => (<Option key={duration} value={duration}>{duration}</Option>))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
              <Button>Save</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <FloatingActionButton onClick={openAddModal} />
    </>
  );
};
