import { useQuery } from "@tanstack/react-query";
import { Template } from "./Template.type";
import { TimeSlot } from "./TimeSlot.type";
import { TodoItem } from "./TodoItem.type";

export const useFetchTemplates: () => { isPending: boolean; error: Error | null; data: Template[] | undefined } = () => {
  const baseUrl = 'http://localhost:8080/template-definitions';
  const templateFetch: () => Promise<Template[]> = () => fetch(baseUrl)
    .then<Template[]>(res => res.json())
    .then(templates => Promise.all(templates.map(t => fetch(`${baseUrl}/${t.id}/time-slots`)
      .then<TimeSlot[]>(res => res.json())
      .then(timeSlots => {
        t.timeSlots = timeSlots;

        return Promise.all(timeSlots.map(ts => fetch(`${baseUrl}/${t.id}/time-slots/${ts.id}/todo-items`)
          .then<TodoItem[]>(res => res.json())
          .then(todoItems => {
            ts.todoItems = todoItems;
          })));
      })))
    .then(() => templates));
  const { isPending, error, data } = useQuery({ queryKey: ['templateDefintions'], queryFn: templateFetch });

  return { isPending, error, data };
}
