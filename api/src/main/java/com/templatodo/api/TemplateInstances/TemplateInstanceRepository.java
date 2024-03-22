package com.templatodo.api.TemplateInstances;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateInstanceRepository extends MongoRepository<TemplateInstance, String> {
    
}
