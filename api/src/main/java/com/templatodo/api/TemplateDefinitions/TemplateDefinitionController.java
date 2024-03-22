package com.templatodo.api.TemplateDefinitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("template-definitions")
public class TemplateDefinitionController {
	@Autowired
	private TemplateDefinitionService service;

	@GetMapping("")
	public List<TemplateDefinition> templates() {
		return this.service.GetAll();
	}

	@PostMapping("")
	public void save(@RequestBody TemplateDefinitionDto templateDefinition) {
		this.service.Save(templateDefinition);
	}
}
