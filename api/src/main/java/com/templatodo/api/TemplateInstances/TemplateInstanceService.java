package com.templatodo.api.TemplateInstances;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public TemplateInstance create(String templateDefinitionId, LocalDate instanceDate) {
        TemplateDefinitionDto def = this.templateDefinitionService.getById(templateDefinitionId);

        TemplateInstance instance = new TemplateInstance();

        instance.setActionedItems(new ArrayList<ActionedItem>());
        instance.setDate(LocalDate.now());
        instance.setTemplateSnapshot(def);
        
        this.repository.save(instance);

        return instance;
    }
}
