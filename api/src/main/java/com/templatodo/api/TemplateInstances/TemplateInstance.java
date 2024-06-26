package com.templatodo.api.TemplateInstances;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.templatodo.api.TemplateDefinitions.TemplateDefinitionDto;

@Document(collection = "templateInstances")
public class TemplateInstance {
    @Id
    private String id;
    private TemplateDefinitionDto templateSnapshot;
    private LocalDate date;
    private List<ActionedItem> actionedItems;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public TemplateDefinitionDto getTemplateSnapshot() {
        return templateSnapshot;
    }
    public void setTemplateSnapshot(TemplateDefinitionDto templateSnapshot) {
        this.templateSnapshot = templateSnapshot;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public List<ActionedItem> getActionedItems() {
        return actionedItems;
    }

    public void addActionedItem(ActionedItem item) {
        this.actionedItems.add(item);
    }

    public void setActionedItems(List<ActionedItem> actionedItems) {
        this.actionedItems = actionedItems;
    }








}
