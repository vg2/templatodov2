package com.templatodo.api.TemplateDefinitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class TemplateDefinitionController {
	@Autowired
	private TemplateDefinitionService service;

	@GetMapping("/templates")
	public List<TemplateDefinition> templates() {
		return this.service.GetAll();
	}

	@PostMapping("/templateDefinition")
	public void postMethodName(@RequestBody TemplateDefinition templateDefinition) {
		this.service.Save(templateDefinition);
	}
}
