package com.templatodo.api.TemplateDefinitions;

import java.security.Principal;
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
	public List<TemplateDefinitionDto> templates(Principal principal) {
		return this.service.getAll(principal.getName());
	}

	@GetMapping("/{templateDefId}/time-slots")
	public List<TimeSlotDto> getTimeSlots(@PathVariable String templateDefId, Principal principal) {
		return this.service.getTimeSlots(templateDefId, principal.getName());
	}

	@GetMapping("/todo-items")
	public List<TodoItemDto> getTodoItems(Principal principal) {
		return this.service.getTodoItems(principal.getName());
	}

	@PostMapping("")
	public void save(@RequestBody TemplateDefinitionDto templateDefinition, Principal principal) throws Exception {
		this.service.save(templateDefinition, principal.getName());
	}

	@PostMapping("/{templateDefId}/time-slots")
	public String saveTimeSlots(@PathVariable String templateDefId, @RequestBody List<TimeSlotDto> timeSlots) {
		this.service.save(null, templateDefId);
	}
	
}
