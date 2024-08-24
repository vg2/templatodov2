import { IconButton, List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from "@mui/joy";
import { Edit, RemoveCircleOutline } from '@mui/icons-material';
import { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { Fragment } from "react/jsx-runtime";

type TodoListInputType = {
  todos: TodoItemInTemplate[];
}

export const TodoList = ({ todos }: TodoListInputType) => {
  const groupedList = Object.groupBy(todos, (todo) => todo.timeSlot.id!);

  return (
    <>
      {
        Object.keys(groupedList).map(timeSlotId => (
          <Fragment key={timeSlotId}>
            <Stack direction='row' gap={1} alignItems='center'>
              <Typography level='title-md'>{todos.find(t => t.timeSlot.id === parseInt(timeSlotId))?.timeSlot.name}</Typography>
              <Typography level='body-sm'>{todos.find(t => t.timeSlot.id === parseInt(timeSlotId))?.timeSlot.description}</Typography>
            </Stack>
            <List>
              {todos.filter(t => t.timeSlot.id === parseInt(timeSlotId)).map(todo => (
                <ListItem key={todo.todoItem.id} startAction={<IconButton aria-label='Edit' size='sm' variant='plain'><Edit /></IconButton>}
                  endAction={<IconButton aria-label='Remove' size='sm' variant='plain'><RemoveCircleOutline /></IconButton>}>
                  <ListItemButton>
                    <ListItemContent>
                      <Typography level="title-sm">{todo.todoItem.name}</Typography>
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
