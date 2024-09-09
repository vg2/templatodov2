import type { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from "@mui/joy";
import { Fragment } from "react/jsx-runtime";

type TodoListInputType = {
  todos: TodoItemInTemplate[];
}

export const TodoList = ({ todos }: TodoListInputType) => {
  const groupedList = Object.groupBy(todos, (todo) => todo.timeSlot.id ?? 0);

  return (
    <>
      {
        Object.keys(groupedList).map(timeSlotId => (
          <Fragment key={timeSlotId}>
            <Stack direction='row' gap={1} alignItems='center'>
              <Typography level='title-md'>{todos.find(t => t.timeSlot.id === Number.parseInt(timeSlotId, 10))?.timeSlot.name}</Typography>
              <Typography level='body-sm'>{todos.find(t => t.timeSlot.id === Number.parseInt(timeSlotId, 10))?.timeSlot.description}</Typography>
            </Stack>
            <List>
              {todos.filter(t => t.timeSlot.id === Number.parseInt(timeSlotId, 10)).map(todo => (
                <ListItem key={todo.todoItem.id}>
                  <ListItemButton>
                    <ListItemContent>
                      <Typography level="title-sm">{todo.todoItem.name} | {todo.pointsInCycle.join(',')}</Typography>
                      <Typography level="body-sm" noWrap>
                        {todo.todoItem.description}
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Fragment>
        ))
      }
    </>
  )
}
