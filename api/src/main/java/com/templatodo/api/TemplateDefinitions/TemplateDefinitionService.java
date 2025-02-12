package com.templatodo.api.TemplateDefinitions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.templatodo.api.Users.User;
import com.templatodo.api.Users.UserRepository;

@Service
public class TemplateDefinitionService {
    @Autowired
    private TemplateDefinitionRepository templateDefRepository;
    @Autowired
    private TimeSlotRepository timeSlotRepository;
    @Autowired
    private TodoItemRepository todoRepository;
    @Autowired
    private UserRepository userRepository;

    public void save(TemplateDefinitionDto templateDefinition, String requestUserId) throws Exception {
        String id = templateDefinition.getId();
        if (id != null) {
            Optional<User> user = userRepository.findById(requestUserId);
            if (user.isPresent()) {
                Boolean hasAccess = user.get().getTemplateIds().stream().anyMatch(x -> x == id);
                if (!hasAccess) {
                    throw new Exception("Not authorised");
                }
            } else {
                throw new Exception("Not authorised");
            }
        }
        TemplateDefinition def = templateDefinition.toDomain();
        this.templateDefRepository.save(def);
    }

    public void saveTimeSlots(String templateDefId, List<TimeSlotDto> timeSlots, string userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (!user.isPresent() || !user.get().getTemplateIds().contains(templateDefId)) {
            throw new Exception("unauthorised");
        }
    }

    public List<TemplateDefinitionDto> getAll(String userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (!user.isPresent()) {
            return List.of();
        }
        List<TemplateDefinition> defs = this.templateDefRepository.findAllById(user.get().getTemplateIds());

        return defs.stream().map(x -> TemplateDefinitionDto.fromDomain(x)).collect(Collectors.toList());
    }

    public Optional<TemplateDefinitionDto> getById(String templateDefinitionId, String userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (!user.isPresent() || !user.get().getTemplateIds().contains(templateDefinitionId)) {
            return Optional.empty();
        }
        TemplateDefinition def = this.templateDefRepository.findById(templateDefinitionId).get();
        TemplateDefinitionDto dto = TemplateDefinitionDto.fromDomain(def);

        return Optional.of(dto);
    }

    public List<TimeSlotDto> getTimeSlots(String templateDefinitionId, String userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (!user.isPresent() || !user.get().getTemplateIds().contains(templateDefinitionId)) {
            return List.of();
        }
        return this.timeSlotRepository
            .findAll()
            .stream()
            .filter(x -> x.getTemplateId().equals(templateDefinitionId))
            .map(x -> TimeSlotDto.fromDomain(x))
            .collect(Collectors.toList());
    }

    public List<TodoItemDto> getTodoItems(String userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (!user.isPresent()) {
            return List.of();
        }
        return this.todoRepository.findAllById(user.get().getTodoItemIds())
                .stream()
                .map(x -> TodoItemDto.fromDomain(x))
                .collect(Collectors.toList());
    }

}
