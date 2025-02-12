package com.templatodo.api.TemplateDefinitions;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class TemplateDefinitionDto {
    private String id;
    private String name;
    private String description;
    private Frequency frequency;
    private int cycleLength;
    private LocalDate startDate;
    private List<TodoItemInTemplate> todos;

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

    public Frequency getFrequency() {
        return frequency;
    }

    public void setFrequency(Frequency frequency) {
        this.frequency = frequency;
    }

    public int getCycleLength() {
        return cycleLength;
    }

    public void setCycleLength(int cycleLength) {
        this.cycleLength = cycleLength;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public List<TodoItemInTemplate> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoItemInTemplate> todos) {
        this.todos = todos;
    }

    public TemplateDefinition toDomain() {
        TemplateDefinition def = new TemplateDefinition();
        def.setId(this.getId());
        def.setName(this.getName());
        def.setDescription(this.getDescription());
        def.setFrequency(this.getFrequency());
        def.setCycleLength(this.getCycleLength());
        def.setStartDate(this.getStartDate());
        def.setTodos(this.getTodos());
        return def;
    }

    public static TemplateDefinitionDto fromDomain(TemplateDefinition def) {
        TemplateDefinitionDto dto = new TemplateDefinitionDto();
        dto.setId(def.getId());
        dto.setName(def.getName());
        dto.setDescription(def.getDescription());
        dto.setFrequency(def.getFrequency());
        dto.setCycleLength(def.getCycleLength());
        dto.setStartDate(def.getStartDate());
        dto.setTodos(def.getTodos());
        return dto;
    }
}
