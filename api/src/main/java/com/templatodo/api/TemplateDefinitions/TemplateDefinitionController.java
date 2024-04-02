package com.templatodo.api.TemplateDefinitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@RestController
@RequestMapping("template-definitions")
public class TemplateDefinitionController {
	@Autowired
	private TemplateDefinitionService service;

	@GetMapping("")
	public List<TemplateDefinitionDto> templates() {
		return this.service.getAll();
	}

	@GetMapping("/{templateDefId}/time-slots")
	public List<TimeSlotDto> getMethodName(@PathVariable String templateDefId) {
		return this.service.getTimeSlots(templateDefId);
	}

	@GetMapping("/{templateDefId}/time-slots/{timeSlotId}/todo-items")
	public List<TodoItemDto> getMethodName(@PathVariable String templateDefId, @PathVariable String timeSlotId) {
		return this.service.getTodoItems(timeSlotId);
	}

	@PostMapping("")
	public void save(@RequestBody TemplateDefinitionDto templateDefinition) {
		this.service.save(templateDefinition);
	}
}
