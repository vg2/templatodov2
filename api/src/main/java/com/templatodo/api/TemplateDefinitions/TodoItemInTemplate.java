package com.templatodo.api.TemplateDefinitions;

public class TodoItemInTemplate {
    private int todoItemId;
    private int timeSlotId;
    private int[] pointsInCycle;

    public int getTodoItemId() {
        return todoItemId;
    }
    public void setTodoItemId(int todoItemId) {
        this.todoItemId = todoItemId;
    }
    public int getTimeSlotId() {
        return timeSlotId;
    }
    public void setTimeSlotId(int timeSlotId) {
        this.timeSlotId = timeSlotId;
    }
    public int[] getPointsInCycle() {
        return pointsInCycle;
    }
    public void setPointsInCycle(int[] pointsInCycle) {
        this.pointsInCycle = pointsInCycle;
    }
}
