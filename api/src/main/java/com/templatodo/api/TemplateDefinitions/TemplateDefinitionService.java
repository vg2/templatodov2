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

    public void save(TemplateDefinitionDto templateDefinition) {
        TemplateDefinition def = templateDefinition.toDomain();
        def.setTimeSlotIds(new ArrayList<String>());
        List<TimeSlotDto> timeSlots = templateDefinition.getTimeSlots();
        for (int i = 0; i < timeSlots.size(); i++) {
            TimeSlotDto timeSlot = timeSlots.get(i);
            List<TodoItem> todoItems = timeSlot.getTodoItems().stream().map(x -> x.toDomain())
                    .collect(Collectors.toList());

            todoRepository.saveAll(todoItems);
            List<String> todoIds = todoItems.stream().map(x -> x.getId()).collect(Collectors.toList());
            TimeSlot ts = timeSlot.toDomain();
            ts.setTodoItemIds(todoIds);
            timeSlotRepository.save(ts);

            def.getTimeSlotIds().add(ts.getId());
        }

        this.templateDefRepository.save(def);
    }

    public List<TemplateDefinitionDto> getAll() {
        List<TemplateDefinition> defs = this.templateDefRepository.findAll();

        return defs.stream().map(x -> TemplateDefinitionDto.fromDomain(x)).collect(Collectors.toList());
    }

    public List<TimeSlotDto> getTimeSlots(String templateDefinitionId) {
        List<String> timeSlotIds = this.templateDefRepository.findById(templateDefinitionId).get().getTimeSlotIds();
        
        return this.timeSlotRepository.findAllById(timeSlotIds)
            .stream()
            .map(x -> TimeSlotDto.fromDomain(x))
            .collect(Collectors.toList());
    }

    public List<TodoItemDto> getTodoItems(String timeSlotId) {
        List<String> todoItemIds = this.timeSlotRepository.findById(timeSlotId).get().getTodoItemIds();
        
        return this.todoRepository.findAllById(todoItemIds)
            .stream()
            .map(x -> TodoItemDto.fromDomain(x))
            .collect(Collectors.toList());
    }
}
