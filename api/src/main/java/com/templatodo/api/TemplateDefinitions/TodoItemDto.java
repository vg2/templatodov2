package com.templatodo.api.TemplateDefinitions;

public class TodoItemDto {
    private String id;
    private String name;
    private String description;
    private int typicalDuration;
    private DurationUnit typicalDurationUnit;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTypicalDuration() {
        return typicalDuration;
    }

    public void setTypicalDuration(int typicalDuration) {
        this.typicalDuration = typicalDuration;
    }

    public DurationUnit getTypicalDurationUnit() {
        return typicalDurationUnit;
    }

    public void setTypicalDurationUnit(DurationUnit typicalDurationUnit) {
        this.typicalDurationUnit = typicalDurationUnit;
    }

    public TodoItem toDomain() {
        TodoItem item = new TodoItem();
        item.setId(this.getId());
        item.setName(this.getName());
        item.setDescription(this.getDescription());
        item.setTypicalDuration(this.getTypicalDuration());
        item.setTypicalDurationUnit(this.getTypicalDurationUnit());

        return item;
    }

    public static TodoItemDto fromDomain(TodoItem todo) {
        TodoItemDto item = new TodoItemDto();
        item.setId(todo.getId());
        item.setName(todo.getName());
        item.setDescription(todo.getDescription());
        item.setTypicalDuration(todo.getTypicalDuration());
        item.setTypicalDurationUnit(todo.getTypicalDurationUnit());

        return item;
    }
}
