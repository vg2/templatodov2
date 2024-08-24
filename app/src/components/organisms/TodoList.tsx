import { IconButton, List, ListItem, ListItemButton, ListItemContent, Typography } from "@mui/joy";
import { Edit, RemoveCircleOutline } from '@mui/icons-material';
import { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";

type TodoListInputType = {
  todos: TodoItemInTemplate[];
}

export const TodoList = ({ todos }: TodoListInputType) => {
  return (
    <List>
      {todos.map(todo => (
        <ListItem startAction={<IconButton aria-label='Edit' size='sm' variant='plain'><Edit /></IconButton>}
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
  )
}
