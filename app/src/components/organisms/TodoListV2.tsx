import type { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { Fragment } from "react/jsx-runtime";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../atoms/Collapsible";
import { H4, Large } from "../atoms/Typography";
import { Button } from "../atoms/Button";
import { ChevronsUpDown } from "lucide-react";

type TodoListInputType = {
  todos: TodoItemInTemplate[];
}

export const TodoListV2 = ({ todos }: TodoListInputType) => {
  const groupedList = Object.groupBy(todos, (todo) => todo.timeSlot.key ?? 0);

  return (
    <>
      {
        Object.keys(groupedList).map(timeSlotId => (
          <Fragment key={timeSlotId}>
            <Collapsible>
              <div className="flex flex-row items-center gap-2">
                <H4>{todos.find(t => t.timeSlot.key === Number.parseInt(timeSlotId, 10))?.timeSlot.name}</H4>
                <Large>{todos.find(t => t.timeSlot.key === Number.parseInt(timeSlotId, 10))?.timeSlot.description}</Large>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>

                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                {todos.filter(t => t.timeSlot.key === Number.parseInt(timeSlotId, 10)).map(todo => (
                  <div key={todo.todoItem.key} className="flex flex-col gap-1">
                    <div>{todo.todoItem.name}</div>
                    <div>{todo.todoItem.description}</div>
                    <div>{todo.pointsInCycle.join(',')}</div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </Fragment>
        ))
      }
    </>
  )
}
