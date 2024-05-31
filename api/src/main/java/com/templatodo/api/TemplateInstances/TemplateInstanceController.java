package com.templatodo.api.TemplateInstances;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("template-instances")
public class TemplateInstanceController {
    @Autowired
    private TemplateInstanceService service;
    
    @GetMapping("")
    public List<TemplateInstance> getAll() {
        return this.service.getAll();
    }

    @GetMapping("/{templateDefId}/instance/{instanceDate}")
    public TemplateInstance getWithCreate(@PathVariable String templateDefId, @PathVariable LocalDate instanceDate) {
        return this.service.getWithCreate(templateDefId, instanceDate);
    }

    @PostMapping("/{templateDefId}/new-instance/{instanceDate}")
    public TemplateInstance newInstance(@PathVariable String templateDefId, @PathVariable LocalDate instanceDate) {
        return this.service.create(templateDefId, instanceDate);
    }

    @PostMapping("")
    public void save(@RequestBody TemplateInstance entity) {
        this.service.save(entity);
    }

    @PostMapping("/{templateInstanceId}/action-item")
    public void actionItem(@PathVariable String templateInstanceId, @RequestBody ActionItemDto actionItemRequest) {
        this.service.actionItem(templateInstanceId, actionItemRequest);
    }
}
