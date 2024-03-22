package com.templatodo.api.TemplateDefinitions;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.annotation.Id;

public class TimeSlotDto {
    @Id
    private String id;

    private String name;
    private String description;
    private int duration;
    private DurationUnit durationUnit;
    private LocalTime timeOfDay;
    private List<TodoItemDto> todoItems;

    public List<TodoItemDto> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(List<TodoItemDto> todoItems) {
        this.todoItems = todoItems;
    }

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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public DurationUnit getDurationUnit() {
        return durationUnit;
    }

    public void setDurationUnit(DurationUnit durationUnit) {
        this.durationUnit = durationUnit;
    }

    public LocalTime getTimeOfDay() {
        return timeOfDay;
    }

    public void setTimeOfDay(LocalTime timeOfDay) {
        this.timeOfDay = timeOfDay;
    }

    public TimeSlot toDomain() {
        TimeSlot slot = new TimeSlot();
        slot.setId(this.getId());
        slot.setName(this.getName());
        slot.setDescription(this.getDescription());
        slot.setDuration(this.getDuration());
        slot.setDurationUnit(this.getDurationUnit());
        slot.setTimeOfDay(this.getTimeOfDay());

        return slot;
    }

    public static TimeSlotDto fromDomain(TimeSlot slot) {
        TimeSlotDto dto = new TimeSlotDto();
        dto.setId(slot.getId());
        dto.setName(slot.getName());
        dto.setDescription(slot.getDescription());
        dto.setDuration(slot.getDuration());
        dto.setDurationUnit(slot.getDurationUnit());
        dto.setTimeOfDay(slot.getTimeOfDay());
        return dto;
    }
}
