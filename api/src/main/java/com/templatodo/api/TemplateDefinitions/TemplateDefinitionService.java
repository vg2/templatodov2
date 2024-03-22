package com.templatodo.api.TemplateDefinitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemplateDefinitionService {
    @Autowired
    private TemplateDefinitionRepository repository;

    public void Save(TemplateDefinition templateDefinition) {
        this.repository.save(templateDefinition);
    }

    public List<TemplateDefinition> GetAll() {
        return this.repository.findAll();
    }
}
