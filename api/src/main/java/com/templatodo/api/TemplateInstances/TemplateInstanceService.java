package com.templatodo.api.TemplateInstances;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.templatodo.api.TemplateDefinitions.TemplateDefinitionDto;
import com.templatodo.api.TemplateDefinitions.TemplateDefinitionService;

@Service
public class TemplateInstanceService {
    @Autowired
    private TemplateInstanceRepository repository;
    @Autowired
    private TemplateDefinitionService templateDefinitionService;
    
    public List<TemplateInstance> getAll() {
        return repository.findAll();
    } 

    public void save(TemplateInstance instance) {
        this.repository.save(instance);
    }

    public TemplateInstance getWithCreate(String templateDefinitionId, LocalDate instanceDate) {
        Optional<TemplateInstance> instance = this.getAll().stream().filter(x -> x.getTemplateSnapshot().getId().equals(templateDefinitionId) && x.getDate().equals(instanceDate)).findFirst();
        if (instance.isPresent()) return instance.get();

        return create(templateDefinitionId, instanceDate);
    }

    public TemplateInstance create(String templateDefinitionId, LocalDate instanceDate) {
        TemplateDefinitionDto def = this.templateDefinitionService.getById(templateDefinitionId);

        TemplateInstance instance = new TemplateInstance();

        instance.setActionedItems(new ArrayList<ActionedItem>());
        instance.setDate(LocalDate.now());
        instance.setTemplateSnapshot(def);
        
        this.repository.save(instance);

        return instance;
    }

    public void actionItem(String templateInstanceId, ActionItemDto actionItemRequest) {
        TemplateInstance instance = this.repository.findById(templateInstanceId).get();

        ActionedItem item = new ActionedItem();
        item.setTodoItemId(actionItemRequest.getTodoItemId());
        item.setState(actionItemRequest.getState());
        item.setComment(actionItemRequest.getComment());
        item.setTimestamp(new Timestamp(System.currentTimeMillis()));

        instance.addActionedItem(item);

        this.repository.save(instance);
    }
}
