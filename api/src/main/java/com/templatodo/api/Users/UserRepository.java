package com.templatodo.api.Users;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
   List<User> findByAge(int age); 
}
