package com.templatodo.api.TemplateDefinitions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateDefinitionRepository extends MongoRepository<TemplateDefinition, String> {
    
}
