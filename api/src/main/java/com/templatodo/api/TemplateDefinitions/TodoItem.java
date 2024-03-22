package com.templatodo.api.TemplateDefinitions;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todoItems")
public class TodoItem {
    @Id
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
}
