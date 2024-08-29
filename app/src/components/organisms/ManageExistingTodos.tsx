import { TodoItem } from "@app/model/TodoItem.type"
import { TodoItemInTemplate, TodoItemInTemplateForm, TodoItemsInTemplateForm } from "@app/model/TodoItemInTemplate.type";
import { Checkbox, List, ListItem, ListItemButton, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { managingExistingTodosSchema } from "./manage-existing-todos.schema";

type ManagingExistingTodosInput = {
  allTodos: TodoItem[];
  todosInTemplate: TodoItemInTemplate[];
  save: (todosInTemplate: TodoItemInTemplate[]) => Promise<void>;
}

const getDefaultFormValues = (allTodos: TodoItem[], todosInTemplate: TodoItemInTemplate[]): TodoItemsInTemplateForm => {
  const formTodos: TodoItemInTemplateForm[] = allTodos.map(todo => {
    const alreadyInTemplate = todosInTemplate.find(x => x.todoItem.id && x.todoItem.id === todo.id);
    return alreadyInTemplate ? { ...alreadyInTemplate, selected: true } : { todoItem: todo, selected: false };
  })

  return { todoItemsInTemplate: formTodos };
}

export const ManageExistingTodos = ({ allTodos: todos, todosInTemplate, save }: ManagingExistingTodosInput) => {
  const form = useForm<TodoItemsInTemplateForm, Validator<TodoItemsInTemplateForm | unknown>>({
    validatorAdapter: zodValidator(),
    validators: { onChange: managingExistingTodosSchema, onSubmit: managingExistingTodosSchema},
    onSubmit: async ({ value }) => {
      console.log(value);
      await save(value.todoItemsInTemplate as TodoItemInTemplate[]);
      // const timeSlotId = await saveTimeSlot(value);
    },
    defaultValues: getDefaultFormValues(todos, todosInTemplate),
  });

  return (
    <>
      <Typography level='title-md'>Todos</Typography>
      <div role="group" aria-labelledby="template-todos-group">
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
          <List>
            <form.Field name="todoItemsInTemplate" mode="array">
              {(field) => {
                return (
                  field.state.value.map((_, i) => {
                    return (
                      <form.Field key={i} name={`todoItemsInTemplate[${i}].selected`}>
                        {(subField => {
                          return (
                            <ListItem>
                              <ListItemButton>
                                <ListItemDecorator>
                                  <Checkbox checked={subField.state.value} onChange={(e) => subField.handleChange(e.target.checked)} />
                                </ListItemDecorator>
                                <Stack direction='column' gap={1}>
                                  <Typography level='title-sm'>{field.state.value[i].todoItem!.name}</Typography>
                                  <Typography level='body-sm'>{field.state.value[i].todoItem!.description}</Typography>
                                </Stack>
                              </ListItemButton>
                            </ListItem>
                          )
                        })}
                      </form.Field>
                    )
                  })
                )
              }}
            </form.Field>
          </List>
        </form>
      </div>
    </>
  );

}
