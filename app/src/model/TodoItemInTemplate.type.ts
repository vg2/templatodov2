import { TimeSlot } from "./TimeSlot.type";
import { TodoItem } from "./TodoItem.type"

export type TodoItemInTemplate = {
  todoItem: TodoItem;
  timeSlot: TimeSlot;
  pointsInCycle: number[];
}

type SelectedItemInTemplateForm = TodoItemInTemplate & { selected: true }
type UnselectedItemInTemplateForm = Pick<TodoItemInTemplate, 'todoItem'> & { selected: false };
export type TodoItemInTemplateForm = SelectedItemInTemplateForm | UnselectedItemInTemplateForm;

export type TodoItemsInTemplateForm = {
  todoItemsInTemplate: TodoItemInTemplateForm[];
}
