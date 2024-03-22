package com.templatodo.api.TemplateDefinitions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TimeSlotRepository extends MongoRepository<TimeSlot, String> {
    
}
