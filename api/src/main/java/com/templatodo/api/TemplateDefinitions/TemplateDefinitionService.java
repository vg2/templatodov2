package com.templatodo.api.TemplateDefinitions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemplateDefinitionService {
    @Autowired
    private TemplateDefinitionRepository templateDefRepository;
    @Autowired
    private TimeSlotRepository timeSlotRepository;
    @Autowired
    private TodoItemRepository todoRepository;

    public void Save(TemplateDefinitionDto templateDefinition) {
        TemplateDefinition def = templateDefinition.toDomain();
        def.setTimeSlotIds(new ArrayList<String>());
        List<TimeSlotDto> timeSlots = templateDefinition.getTimeSlots();
        for (int i = 0; i < timeSlots.size(); i++) {
            TimeSlotDto timeSlot = timeSlots.get(i); 
            List<TodoItem> todoItems = timeSlot.getTodoItems().stream().map(x -> x.toDomain()).collect(Collectors.toList());

            todoRepository.saveAll(todoItems);
            List<String> todoIds = todoItems.stream().map(x -> x.getId()).collect(Collectors.toList());
            TimeSlot ts = timeSlot.toDomain();
            ts.setTodoItemIds(todoIds);
            timeSlotRepository.save(ts);

            def.getTimeSlotIds().add(ts.getId());
        }

        this.templateDefRepository.save(def);
    }

    public List<TemplateDefinitionDto> GetAll() {
        List<TemplateDefinition> defs = this.templateDefRepository.findAll();

        return defs.stream().map()
    }
}
