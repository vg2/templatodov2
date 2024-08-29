import { TodoItem } from "@app/model/TodoItem.type"
import { TodoItemInTemplate, TodoItemsInTemplateForm } from "@app/model/TodoItemInTemplate.type";
import { Checkbox, List, ListItem, ListItemButton, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

type ManagingExistingTodosInput = {
  allTodos: TodoItem[];
  todosInTemplate: TodoItemInTemplate[];
  save: (todosInTemplate: TodoItemInTemplate[]) => Promise<void>;
}

export const ManageExistingTodos = ({ allTodos: todos, todosInTemplate, save }: ManagingExistingTodosInput) => {
  const todoInTemplate = (todoId: number): boolean => {
    return todosInTemplate.some(t => t.todoItem.id === todoId);
  }

  const form = useForm<TodoItemsInTemplateForm, Validator<TodoItemsInTemplateForm | unknown>>({
    validatorAdapter: zodValidator(),
    validators: { onChange: , onSubmit: },
    onSubmit: async ({ value }) => {
      console.log(value);
      // const timeSlotId = await saveTimeSlot(value);
      save(value);
    },
    defaultValues: { todosInTemplate: todosInTemplate },
  });

  return (
    <>
      <Typography level='title-md'>Todos</Typography>
      <div role="group" aria-labelledby="template-todos-group">
        <List>
          {todos.map(todo => (
            <ListItem key={todo.id}>
              <ListItemButton>
                <ListItemDecorator>
                  <Checkbox checked={todoInTemplate(todo.id)} />
                </ListItemDecorator>
                <Stack direction='column' gap={1}>
                  <Typography level='title-sm'>{todo.name}</Typography>
                  <Typography level='body-sm'>{todo.description}</Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );

}
