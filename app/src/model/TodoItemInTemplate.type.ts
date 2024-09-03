import type { ExistingTimeSlot } from "./TimeSlot.type";
import type { ExistingTodoItem } from "./TodoItem.type";

export type TodoItemInTemplate = {
  todoItem: ExistingTodoItem;
  timeSlot: ExistingTimeSlot;
  pointsInCycle: number[];
}

type SelectedItemInTemplateForm = TodoItemInTemplate & { selected: true }
type UnselectedItemInTemplateForm = Pick<TodoItemInTemplate, 'todoItem'> & { selected: false };
export type TodoItemInTemplateForm = SelectedItemInTemplateForm | UnselectedItemInTemplateForm;

export type TodoItemsInTemplateForm = {
  todoItemsInTemplate: TodoItemInTemplateForm[];
}
