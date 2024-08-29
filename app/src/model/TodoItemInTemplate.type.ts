import { TimeSlot } from "./TimeSlot.type";
import { TodoItem } from "./TodoItem.type"

export type TodoItemInTemplate = {
  todoItem: TodoItem;
  timeSlot: TimeSlot;
  pointInCycle: number;
}

export type TodoItemsInTemplateForm = {
  todoItemsInTemplate: TodoItemInTemplate[];
}
