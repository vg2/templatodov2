package com.templatodo.api.TemplateDefinitions;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timeslots")
public class TimeSlot {
    @Id
    private String id;

    private String name;
    private String description;
    private int duration;
    private DurationUnit durationUnit;
    private LocalTime timeOfDay;
    private List<String> todoItemIds;

    public List<String> getTodoItemIds() {
        return todoItemIds;
    }

    public void setTodoItemIds(List<String> todoItemIds) {
        this.todoItemIds = todoItemIds;
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
}
