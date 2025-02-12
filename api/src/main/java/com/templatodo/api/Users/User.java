package com.templatodo.api.Users;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	@Id
	private String id;
	private int age;
	private String name;
	private List<String> templateIds;
	private List<String> todoItemIds;

	public List<String> getTodoItemIds() {
		return todoItemIds;
	}

	public void setTodoItemIds(List<String> todoItemIds) {
		this.todoItemIds = todoItemIds;
	}

	public List<String> getTemplateIds() {
		return templateIds;
	}

	public void setTemplateIds(List<String> templateIds) {
		this.templateIds = templateIds;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
}
