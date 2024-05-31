package com.templatodo.api.TemplateInstances;

public class ActionItemDto {
    private String todoItemId;
    private TodoState state;
    private String comment;

    public String getTodoItemId() {
        return todoItemId;
    }
    public void setTodoItemId(String todoItemId) {
        this.todoItemId = todoItemId;
    }
    public TodoState getState() {
        return state;
    }
    public void setState(TodoState state) {
        this.state = state;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
}
