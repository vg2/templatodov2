import { TodoItem } from "@app/model/TodoItem.type"
import { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { Checkbox, List, ListItem, ListItemButton, ListItemDecorator, Stack, Typography } from "@mui/joy";

type ManagingExistingTodosInput = {
  allTodos: TodoItem[];
  todosInTemplate: TodoItemInTemplate[];
  toggleTodoInTemplate: (todo: TodoItem) => Promise<void>;
}

export const ManageExistingTodos = ({ allTodos: todos, todosInTemplate, toggleTodoInTemplate }: ManagingExistingTodosInput) => {
  const todoInTemplate = (todoId: number): boolean => {
    return todosInTemplate.some(t => t.todoItem.id === todoId);
  }

  return (
    <>
      <Typography level='title-md'>Todos</Typography>
      <div role="group" aria-labelledby="template-todos-group">
        <List>
          {todos.map(todo => (
            <ListItem key={todo.id}>
              <ListItemButton onClick={() => toggleTodoInTemplate(todo)}>
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
