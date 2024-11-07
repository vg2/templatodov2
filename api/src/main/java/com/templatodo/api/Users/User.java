package com.templatodo.api.Users;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	@Id
	private String id;
	private int age;
	private String name;
	private ArrayList<String> templateIds;

	public ArrayList<String> getTemplateIds() {
		return templateIds;
	}

	public void setTemplateIds(ArrayList<String> templateIds) {
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
