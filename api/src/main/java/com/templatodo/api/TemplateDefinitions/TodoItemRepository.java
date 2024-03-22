package com.templatodo.api.TemplateDefinitions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoItemRepository extends MongoRepository<TodoItem, String> {
    
}
